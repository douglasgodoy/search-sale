import * as puppeteer from 'puppeteer';

const scraping = {
    olx: async body => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const valueSearchUrl: String = body.search.split(' ').join('%20'); //o=10&
        const pagination = body.pagination || false;
        const issetPag = pagination.length ? `o=${pagination.number}&` : '';
        await page.goto(`https://pr.olx.com.br/regiao-de-maringa?${issetPag}q=${valueSearchUrl}`);

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
                const countPages = document.querySelectorAll('[data-lurker-detail="pagination_item"]').length + 1;
                const sanitizeFilters:any = dataArray.map(getDataSale).filter(data => data.title && /http/g.test(data.img));
                sanitizeFilters[0].page = countPages;
                return sanitizeFilters;
            } catch (error) {
                console.error(error)
                return false;
            }
        });
        await browser.close();
        return data;
    }
}

export default async (body: any) => {
    return await scraping.olx(body)
};