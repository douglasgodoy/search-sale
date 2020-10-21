import * as puppeteer from 'puppeteer';
import fns from '../../../utils';

const scraping = {
    init: async body => {
        const browser = await puppeteer.launch();
        const valueSearchUrl: String = body.search.split(' ').join('%20');
        const pagination = body.page || false;
        const issetPag = pagination > 1 ? `o=${pagination}&` : '';
        return {
            url: `https://pr.olx.com.br/regiao-de-maringa/regiao-de-maringa?${issetPag}q=${valueSearchUrl}`,
            page: await browser.newPage(),
            browser
        }
    },
    olx: {
        getDataSanitize: () => {
            try {
                const getDataSale = (el: Element) => ({
                    value: Array.from(el.querySelectorAll('p')).filter(p => p.textContent.match(/R\$/)).map(filtered => filtered.textContent).toString(),
                    img: Array.from(el.querySelectorAll('img')).map(img => img.dataset.src).toString(),
                    title: el.getAttribute('title'),
                    link: el.getAttribute('href')
                });
                const dataArray = Array.from(document.querySelectorAll('#ad-list li a'))
                const countPages = document.querySelectorAll('[data-lurker-detail="pagination_item"]').length + 1;
                const sanitizeFilters: any = dataArray.map(getDataSale).filter(data => data.title && /http/g.test(data.img));
                sanitizeFilters[0].pages = countPages;

                return sanitizeFilters;
            } catch (error) {
                console.log(error)
                return false;
            }
        },
        process: async ({ page, url, browser }) => {
            await page.goto(url);
            const data = await page.evaluate(scraping.olx.getDataSanitize);
            return { browser, data };
        },
    },
    finally: async ({ browser, data }) => { await browser.close(); return data; }
}

export default fns.composeF(
    scraping.init,
    scraping.olx.process,
    scraping.finally
);