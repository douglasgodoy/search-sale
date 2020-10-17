import * as puppeteer from 'puppeteer';

const getFromOlx = async body => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const valueSearchUrl: String = body.search.split(' ').join('%20');
    await page.goto(`https://pr.olx.com.br/regiao-de-maringa?q=${valueSearchUrl}`);

    const data = await page.evaluate(() => {
        try {
            const getDataSale = (el: Element) => ({
                value: Array.from(el.querySelectorAll('p'))
                    .filter(p => p.textContent.match(/R\$/))
                    .map(filtered => filtered.textContent)
                    .toString(),
                img: Array.from(el.querySelectorAll('img'))
                    .map(img => img.dataset.src)
                    .toString(),
                title: el.getAttribute('title'),
                link: el.getAttribute('href')
            });
            const dataArray = Array.from(document.querySelectorAll('#ad-list li a'))
            return dataArray.map(getDataSale).filter(data => data.title && /http/g.test(data.img));
        } catch (error) {
            console.error(error)
            return false;
        }
    });
    await browser.close();
    return data;
}

export default async (body: any) => {
    // const ret = await Promise.all([getFromOlx, getFromFacebook])
    return await getFromOlx(body)


};