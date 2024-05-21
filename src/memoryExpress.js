const puppeteer = require('puppeteer');
const fs = require('fs/promises');

// configurations
const url = "https://www.memoryexpress.com/"
const itemSelector = "div.c-shca-icon-item"

async function scrape() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'domcontentloaded'
	});
	await page.exposeFunction('nodeLog', (msg) => console.log(msg));
	const data = await page.evaluate(() => {
		const posts = document.querySelectorAll("div.c-shca-icon-item");
		window.nodeLog(`got items ${posts.length}`)
		return Array.from(posts).map((post, index) => {
			const rawHTML = post.innerHTML;
			let logs = `processing item # ${index}\n`;

			const titleElem = post.querySelector('div.c-shca-icon-item__body-name');
			const priceElem = post.querySelector('div.c-shca-icon-item__summary-prices');
			const imageElem = post.querySelector('div.c-shca-icon-item__body-image img');
			const linkElem = titleElem.querySelector('a');

			logs += (titleElem ? `found title ${titleElem}\n` : "title not found\n");
			logs += (priceElem ? `found price ${priceElem}\n` : "price not found\n");
			logs += (linkElem ? `found link ${linkElem}\n` : 'link not found\n');
			logs += (imageElem ? `found image ${imageElem}\n` : 'image not found\n');
			window.nodeLog(logs);
			return {
				// rawHTML,
				title: titleElem.innerText,
				price: priceElem.innerText,
				link: linkElem.href,
				image: imageElem.src,
			}
		});
	});

	await browser.close();
	return data;
};


async function saveResult(results) {
	const data = [];
	results.forEach((result) => {
		// console.log(result.logs);
		delete result.logs;
		data.push(result);
	})

	// save to a json file
	const filename = `memoryExpress_${new Date()}.json`;
	const file = await fs.open(`data/${filename}`, 'w+');
	await file.write(JSON.stringify(data));
	await file.close();
}

scrape().then(saveResult).catch((err) => console.error('error encountered', err));


