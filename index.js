const puppeteer = require('puppeteer');

async function scrape() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://my-blogs-kohl.vercel.app', {
		waitUntil: 'domcontentloaded'
	});
	const data = await page.evaluate(() => {
		// select the element using query selector
		// e.g. get title
		// const title = document.title;
		// return title;
		console.log('page evaluated', document.location.host);
		const posts = document.querySelectorAll('section[data-cy="blogs"] ul > li');
		console.log('got all posts', posts);
		return Array.from(posts).map((post) => {
			console.log('processing post', post);
			const title = post.querySelector('a').innerText;
			const dateandtime = post.querySelector('small > time').innerText;
			return { title, dateandtime }
		});
	});

	await browser.close();
	return data;
};

scrape().then((res) => console.log(res)).catch((err) => console.error('error encountered', err));


