import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("public/moments-share");
const base = "http://localhost:3005";

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

// A fixed, normal-sized viewport that never changes.
// This prevents Next.js "dvh/vh" elements from scaling excessively,
// maintaining a stable layout and exact pixel coordinates.
const page = await browser.newPage({
  viewport: { width: 450, height: 1300 },
  deviceScaleFactor: 2.5, // Retina crispness
});

try {
  console.log(`Connecting to: ${base}`);
  await page.goto(base, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  
  // Wait extra time for page to settle and animations to finish
  await page.waitForTimeout(4000);
  
  // Hide sticky navbar, mobile header, and disable animations for clean rendering
  await page.addStyleTag({
    content: `
      header, nav, [data-slot="navbar"] { display: none !important; }
      /* Disable all transitions and animations so they render in final state immediately */
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
    `
  });
  
  await page.waitForTimeout(1000); // Wait for styling to apply
  
  const mainChildren = await page.$$("main > *");
  
  // We define the 8 target segments with their exact indices or queries.
  // We'll calculate their absolute page-coordinates first, while scroll is at 0.
  const segmentDef = [
    {
      id: 1,
      name: "01-brand-intro",
      title: "品牌引言与实力优势",
      getBox: async () => {
        const box1 = await mainChildren[3].boundingBox(); // Hero Section
        const box2 = await mainChildren[4].boundingBox(); // Stats Section
        if (!box1 || !box2) return null;
        return {
          y: box1.y,
          height: (box2.y + box2.height) - box1.y
        };
      }
    },
    {
      id: 2,
      name: "02-core-ai-services",
      title: "三大核心 AI 服务",
      getBox: async () => {
        const el = await page.$("div#services > section:nth-of-type(1)");
        if (!el) return null;
        const box = await el.boundingBox();
        if (!box) return null;
        return { y: box.y, height: box.height };
      }
    },
    {
      id: 3,
      name: "03-fullstack-capabilities",
      title: "全栈能力与行业方案",
      getBox: async () => {
        const itemsEl = await page.$("div#services > section:nth-of-type(2)");
        const industriesEl = await mainChildren[6]; // Industries Section
        const box1 = await itemsEl?.boundingBox();
        const box2 = await industriesEl?.boundingBox();
        if (!box1 || !box2) return null;
        return {
          y: box1.y,
          height: (box2.y + box2.height) - box1.y
        };
      }
    },
    {
      id: 4,
      name: "04-case-youxia",
      title: "代表案例：醴陵釉下五彩瓷官网",
      getBox: async () => {
        const brandEl = await page.$("div#brand");
        const youxiaGrid = await page.$("div#brand .grid:nth-of-type(1)");
        
        const boxBrand = await brandEl?.boundingBox();
        const boxGrid = await youxiaGrid?.boundingBox();
        
        if (!boxBrand || !boxGrid) return null;
        return {
          y: boxBrand.y,
          height: (boxGrid.y + boxGrid.height) - boxBrand.y
        };
      }
    },
    {
      id: 5,
      name: "05-case-hitoys",
      title: "代表案例：Hi.Toys 跨境电商独立站",
      getBox: async () => {
        const cards = await page.$$("div#brand .bg-muted\\/15");
        const grids = await page.$$("div#brand .grid");
        
        const boxCard = await cards[1]?.boundingBox();
        const boxGrid = await grids[1]?.boundingBox();
        
        if (!boxCard || !boxGrid) return null;
        return {
          y: boxCard.y - 15,
          height: (boxGrid.y + boxGrid.height) - boxCard.y + 30
        };
      }
    },
    {
      id: 6,
      name: "06-case-shipinhao",
      title: "代表案例：新媒体视频号营销运营",
      getBox: async () => {
        const cards = await page.$$("div#brand .bg-muted\\/15");
        const grids = await page.$$("div#brand .grid");
        
        const boxCard = await cards[2]?.boundingBox();
        const boxGrid = await grids[2]?.boundingBox();
        
        if (!boxCard || !boxGrid) return null;
        return {
          y: boxCard.y - 15,
          height: (boxGrid.y + boxGrid.height) - boxCard.y + 30
        };
      }
    },
    {
      id: 7,
      name: "07-case-finance-timeline",
      title: "代表案例：金融 AI & 公司历程",
      getBox: async () => {
        const casesEl = await page.$("div#cases");
        const timelineEl = await page.$("div#about");
        
        const box1 = await casesEl?.boundingBox();
        const box2 = await timelineEl?.boundingBox();
        
        if (!box1 || !box2) return null;
        return {
          y: box1.y,
          height: (box2.y + box2.height) - box1.y
        };
      }
    },
    {
      id: 8,
      name: "08-pricing-contact",
      title: "透明定价与联系合作",
      getBox: async () => {
        const plansEl = await page.$("div#plans");
        const footerEl = await page.$("footer");
        
        const box1 = await plansEl?.boundingBox();
        const box2 = await footerEl?.boundingBox();
        
        if (!box1 || !box2) return null;
        return {
          y: box1.y,
          height: (box2.y + box2.height) - box1.y
        };
      }
    }
  ];

  // Step 1: Pre-calculate stable coordinate boxes while at scroll = 0
  console.log("Calculating coordinates for all segments...");
  const segmentBoxes = [];
  for (const seg of segmentDef) {
    const box = await seg.getBox();
    if (box) {
      segmentBoxes.push({
        id: seg.id,
        name: seg.name,
        title: seg.title,
        y: Math.max(0, Math.floor(box.y)),
        height: Math.ceil(box.height)
      });
      console.log(`-> Segment ${seg.id}: Y: ${Math.max(0, Math.floor(box.y))}, Height: ${Math.ceil(box.height)}px`);
    } else {
      console.warn(`-> Warn: Could not resolve bounding box for segment ${seg.id}`);
    }
  }

  // Step 2: Loop over segments, scroll, expand viewport height to match segment height, screenshot, and restore viewport!
  for (const seg of segmentBoxes) {
    console.log(`\nProcessing Segment ${seg.id}: ${seg.title}...`);
    
    // 1. Scroll segment to top of the screen
    await page.evaluate((y) => window.scrollTo(0, y), seg.y);
    await page.waitForTimeout(300); // Wait for browser to scroll and render
    
    // 2. Set viewport height temporarily to match the exact segment height
    await page.setViewportSize({ width: 450, height: seg.height });
    await page.waitForTimeout(500); // Settle repaint
    
    // 3. Take screenshot of exact viewport area (which is perfectly matching our segment!)
    const outPath = path.join(outDir, `${seg.name}.png`);
    await page.screenshot({
      path: outPath,
      fullPage: false, // Captures exactly the viewport boundaries
    });
    console.log(`-> Saved to ${outPath}`);
    
    // 4. Restore viewport height to 1300 for the next scroll coordinate query to be valid
    await page.setViewportSize({ width: 450, height: 1300 });
    await page.waitForTimeout(100);
  }

} catch (err) {
  console.error("Error during execution:", err);
} finally {
  await browser.close();
  console.log("\nAll segments processed!");
}
