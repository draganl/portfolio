// utils/screenshotService.js

import puppeteer from "puppeteer";

export async function generateScreenshot(url, size) {
  // const browser = await puppeteer.launch();
   const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set viewport size based on the provided size
  await page.setViewport({
    width: size.width,
    height: size.height,
    deviceScaleFactor: 1,
  });

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Take a screenshot
  const screenshot = await page.screenshot({ type: "png" });

  await browser.close();
  return screenshot; // Return the screenshot buffer
}
