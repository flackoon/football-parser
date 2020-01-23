const pupetteer = require('puppeteer');

(async () => {
	const browser = await pupetteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.futbol24.com');
	await browser.close();
})();