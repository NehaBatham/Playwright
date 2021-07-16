const playwright = require('playwright');
(
async() => {
    
    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://gorest.co.in/rest-console");

    page.on('request', request => {
        console.log('>>', request.method(), request.url(), request.postData());
    });
  
    await page.route("https://gorest.co.in/public/v1/users", async(route, request)=>{
        await route.fulfill({
            status: 404,
            contentType: 'text/plain',
            body: 'Not Found!'  
        })
    });

    await page.click('text="Send Request"');

    page.on('response', response => {
        console.log('<<', response.request().url(), response.status());
    });

    await page.screenshot({path: `failRequest.png`});
    await browser.close();
}
)();