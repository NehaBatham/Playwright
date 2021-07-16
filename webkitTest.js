//const {webkit, devices} = require('playwright');
//const iPhone11 = devices['iPhone 11 pro'];
const {chromium, devices} = require('playwright');
const android = devices['Pixel 2'];
const playwright = require('playwright');
(async()=>{
  /* const browser = await playwright["webkit"].launch({
        headless: false
    });
    const context = await browser.newContext({
        ...iPhone11,
        locale: 'en-US',
        geolocation: { longitude: 75.86693984861854, latitude: 22.69962945606504 },
        permissions:["geolocation"]
    });*/
    const browser = await playwright["chromium"].launch({
        headless: false
    });
    const context = await browser.newContext({
        ...android,
        locale: 'en-US',
        geolocation: { longitude: 73.84440239845419, latitude: 18.49587702057655 },
        permissions:["geolocation"]
    });
    const page = await context.newPage();
    await page.goto('https://maps.google.com');
    await page.evaluate(() => {
        return new Promise((resolve) => setTimeout(resolve, 500));
      });
    await page.screenshot({path: `location.png`});
    await browser.close();
})();