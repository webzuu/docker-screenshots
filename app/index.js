/*
 * Copyright (c) webzuu Michał Stambulski 2017.
 */

const { PORT } = process.env;
const puppeteer = require('puppeteer');
const url = require('url');

require('http').createServer(async (req, res) => {
    const urlParts = url.parse(req.url, true);
    const query = urlParts.query;
    const subjectUrl = query.url;

    if (!subjectUrl) {
        res.end('No url provided');
    }

    const config = {
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
    };

    let browser = await puppeteer.launch(config);
    let page = await browser.newPage();
    await page.goto(subjectUrl);
    await page.setViewport({width:1200, height: 800});
    const screenshot = await page.screenshot({
        type: 'jpeg'
    });

    console.log(browser);
    res.writeHead(200, {
        'content-type': 'image/jpeg'
    });
    res.end(screenshot, 'binary');

    page.close();
}).listen(PORT || 3333);