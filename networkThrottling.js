const playwright = require('playwright');
(
async() => {

    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    const client = await page.context().newCDPSession(page);

    await client.send('Network.emulateNetworkConditions', {
        'offline': false,
        'downloadThroughput': 200 * 1024 / 8,
        'uploadThroughput': 200 * 1024 / 8,
        'latency': 30
    });

    await page.goto("https://www.hotstar.com/in");
    
    await page.screenshot({path: `NetworkThrottling.png`});
    await browser.close();
}
)();