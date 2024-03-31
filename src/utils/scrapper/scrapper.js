const puppeteer = require("puppeteer");
const fs = require("fs");

const laptopArray = [];
const scrapper = async(url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });
    clousedCookies(page);


    repeatScrapper(page, browser);

};

const clousedCookies = async(page) => {
    try {
        await page.$eval("#cookiesrejectAll", (el) => el.click());
        console.log("Cerrando cookies");
    } catch (error) {
        console.log("Error al cerrar las cookies");
    }
}

const repeatScrapper = async(page, browser) => {
    const arrayProducts = await page.$$(".product-card");
    for (const product of arrayProducts) {
        let price;
        let title = await product.$eval(".product-card__title", (el) => el.textContent);
        let img = await product.$eval("img", (el) => el.src);
        let views;
        try {
            price = await product.$eval(".product-card__price-container", (el) => parseFloat(el.textContent.split('.').join('').replace(",", ".")));
            views = await product.$eval(".jowSXE", (el) => parseFloat(el.textContent.replace("(", "").replace(")", "")));
            const game = {
                title,
                price,
                img,
                views
            }
            laptopArray.push(game);
        } catch (error) {
            const game = {
                title,
                price,
                img,
                isViews: false
            }
            laptopArray.push(game);
        }
    }
    try {
        await page.$eval("[data-testid='icon_right']", (el) => el.click());
        await page.waitForNavigation();
        repeatScrapper(page, browser);
    } catch (error) {
        write(laptopArray);
        await browser.close();
    }
}

const write = (array) => {
    fs.writeFile("laptops.json", JSON.stringify(array), () => {
        console.log("Archivo escrito correctamente");
    });
}



module.exports = { scrapper }