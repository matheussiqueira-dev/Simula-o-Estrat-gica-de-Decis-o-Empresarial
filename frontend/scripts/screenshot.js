const path = require("path");
const { chromium } = require("playwright");

const execPath = path.join(
  process.env.USERPROFILE,
  "AppData",
  "Local",
  "ms-playwright",
  "chromium-1208",
  "chrome-win64",
  "chrome.exe"
);

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: execPath,
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.DEMO_URL || "http://localhost:3000", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1500);

  const outPng = path.join(__dirname, "..", "..", "docs", "demo.png");
  await page.screenshot({ path: outPng, fullPage: true });
  await browser.close();

  console.log(`Screenshot salva em ${outPng}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
