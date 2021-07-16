const playwright = require('playwright');
(
async() => {
    var waitPeriod=1;
    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.hotstar.com/in");
    
    await page.waitForResponse(response => {
        console.log("Starting to wait..." +waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "xhr";
    })
    
    await page.screenshot({path: `neha.png`});
    await browser.close();
}
)();