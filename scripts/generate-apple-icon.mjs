import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const svg = readFileSync(path.resolve("public/favicon.svg"), "utf8");
const html = `<!DOCTYPE html><html><body style="margin:0;background:#09090B;display:flex;align-items:center;justify-content:center;width:180px;height:180px;">${svg.replace('width="32" height="32"', 'width="180" height="180"')}</body></html>`;

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
await page.setContent(html);
const buffer = await page.screenshot({ type: "png", omitBackground: false });
writeFileSync(path.resolve("public/apple-touch-icon.png"), buffer);
await browser.close();
console.log("Generated public/apple-touch-icon.png");
