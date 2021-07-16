const playwright = require('playwright');
(
    async() => {
        const browser = await playwright["chromium"].launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.route('**/\*.{png,jpg,jpeg,svg}', (request)=>{
            if(request.request().resourceType()==='image')
                request.abort();
        });
        await page.goto("https://gorest.co.in/chandamama-stories");
        await page.screenshot({path: `NoImages.png`});
        await browser.close();
    }
)();