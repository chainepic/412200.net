import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("public/brand/youxiawucaici");
const base = "https://youxiawucaici.com";

const pages = [
  { name: "hero", path: "/zh" },
  { name: "civilization", path: "/zh", scrollY: 900 },
  { name: "origin", path: "/zh/origin" },
  { name: "craft", path: "/zh/craft" },
  { name: "masters", path: "/zh/masters" },
  { name: "city", path: "/zh/city" },
  { name: "collection", path: "/zh/collection" },
  { name: "box", path: "/zh/box" },
  { name: "lab", path: "/zh/lab" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

for (const item of pages) {
  await page.goto(`${base}${item.path}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);
  if (item.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), item.scrollY);
    await page.waitForTimeout(1000);
  }
  await page.screenshot({
    path: path.join(outDir, `${item.name}.png`),
    fullPage: false,
  });
}

await browser.close();
console.log("Screenshots saved to", outDir);
