import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("public/brand/hitoys");
const base = "https://hi.toys";

const pages = [
  { name: "hero", path: "/" },
  { name: "hot", path: "/", scrollY: 700 },
  { name: "bjd", path: "/", scrollY: 1600 },
  { name: "plush", path: "/", scrollY: 3200 },
  { name: "products", path: "/collections/all" },
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
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);
  if (item.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), item.scrollY);
    await page.waitForTimeout(1200);
  }
  await page.screenshot({
    path: path.join(outDir, `${item.name}.png`),
    fullPage: false,
  });
  console.log("saved", item.name);
}

await browser.close();
console.log("Screenshots saved to", outDir);
