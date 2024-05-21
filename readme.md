this is a web scraper I am working on using puppeteer, got started with [this post](https://dev.to/tomiloba2/web-scraping-fundamentals-with-puppeteer-and-node-49ke)

### May 16th:
Initial commit, with trying to scrape my own blog. Next up I might want to scape some retailer's website? Price tracking like camelcamelcamel seems useful

First problem, I need a queryselector string to find the path to each item, 
right now it could be
```js
document.querySelectorAll('.c-shca-icon-item')
```
but this might not be sustainable, i.e. tomorrow they might change the class name 
to `'c-shcb-icon-item'` and I would need to fix my code.
How to get a good css selector string?
