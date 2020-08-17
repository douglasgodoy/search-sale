import * as puppeteer from 'puppeteer';

export default async (body: any) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const valueSearchUrl: String = body.search.split(' ').join('%20');

    await page.goto(`https://pr.olx.com.br/regiao-de-maringa?q=${valueSearchUrl}`);

    const data = await page.evaluate(() => {
        const getDataSale = (el: Element) => {
            const title: String = el.getAttribute('title');

            const value: String = Array.from(el.querySelectorAll('p'))
                .filter(p => p.textContent.match(/R\$/))
                .map(filtered => filtered.textContent)
                .reduce((acc, str) => str, '');

            const img: String = Array.from(el.querySelectorAll('img'))
                .map(img => img.src)
                .reduce((acc, str) => str, '');

            const link = el.getAttribute('href');
            return { title, value, img, link }

        }

        return Array.from(document.querySelectorAll('#ad-list li a'))
            .map(getDataSale)
            .filter(data => data.title && data.img.match(/http/g));
    });
    await browser.close();
    return data;
};