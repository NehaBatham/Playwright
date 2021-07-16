const playwright = require('playwright');
(
async() => {
    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://gorest.co.in/chandamama-stories");

    await page.route("https://gorest.co.in/chandamama-stories/hindi", async(route, request)=>{
        console.log(request.url());
        await route.continue({
            url:"https://gorest.co.in/chandamama-stories/english"
        });
    });

    await page.click('text="Hindi"');
    
    await page.evaluate(() => {
      return new Promise((resolve) => setTimeout(resolve, 300));
    });

    page.on('response', response => {
        console.log('<<', response.request().url(), response.status());
    });
   
    await page.screenshot({path: `books.png`});
    await browser.close();
}
)();