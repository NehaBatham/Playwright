const playwright = require('playwright');
(
async() => {

    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await browser.startTracing(page, {path: `trace.json`, screenshots: true});
    await page.goto("https://www.hotstar.com/in");
    await browser.stopTracing();
    await browser.close();
}
)();