import { chromium } from "playwright-core";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = "http://127.0.0.1:5173/";
const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 900 },
];

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const result = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        return { hasCanvas: false };
      }

      const sample = document.createElement("canvas");
      sample.width = Math.min(canvas.width, 160);
      sample.height = Math.min(canvas.height, 120);
      const context = sample.getContext("2d");
      if (!context) {
        return { hasCanvas: true, readable: false };
      }

      context.drawImage(canvas, 0, 0, sample.width, sample.height);
      const data = context.getImageData(0, 0, sample.width, sample.height).data;
      let visiblePixels = 0;
      for (let index = 0; index < data.length; index += 4) {
        const alpha = data[index + 3];
        const brightness = data[index] + data[index + 1] + data[index + 2];
        if (alpha > 0 && brightness > 18) {
          visiblePixels += 1;
        }
      }

      return {
        hasCanvas: true,
        readable: true,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        visiblePixels,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });

    if (!result.hasCanvas || !result.readable || result.visiblePixels < 80) {
      throw new Error(`${viewport.name}: Three.js canvas did not produce enough visible pixels`);
    }

    if (result.scrollWidth > result.viewportWidth + 1) {
      throw new Error(
        `${viewport.name}: horizontal overflow ${result.scrollWidth}px > ${result.viewportWidth}px`,
      );
    }

    console.log(
      `${viewport.name}: ${result.canvasWidth}x${result.canvasHeight}, ` +
        `${result.visiblePixels} visible sampled pixels, no horizontal overflow`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
