const pupetteer = require('puppeteer');
const sleep = require('thread-sleep');

module.exports = {
	getMatchesTodayInfo: async () => {
		const browser = await pupetteer.launch();
		const page = await browser.newPage();
		await page.goto('https://www.futbol24.com');
		sleep(856);
	
		await page.click('#chooseleagues_selAll');
		sleep(234);
		await page.click('.button2');
		sleep(2090);
	
		let matches_today = await page.$$('#f24com_tablelive .match');
		let data = [];
	
		for(let i in matches_today) {
			if (!matches_today[i]) continue;
	
			let match_id = await (await matches_today[i].getProperty('id')).jsonValue();
			let home_team = await matches_today[i].$$('.home .team');
			home_team = await matches_today[i].$eval('.home .team', e => e.innerHTML);
	
			let guest_team = await matches_today[i].$$('.guest .team');
			guest_team = await matches_today[i].$eval('.guest .team', e => e.innerHTML);
	
			let start_time = await page.$(`.match#${match_id} .status`);
			await start_time.click();
			start_time = await page.$eval('#f24com_hint', e => e.innerHTML);
	
			let league = await page.$(`.match#${match_id} .league`);
			await league.click();
			league = await page.$eval('#f24com_hint', e => e.innerHTML);
	
			data.push({ home_team, guest_team, start_time, league });
			sleep(420);
		}
		
		sleep(1415);
		await browser.close();
	}
}