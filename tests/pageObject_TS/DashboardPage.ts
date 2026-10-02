import {Locator,Page} from '@playwright/test';

export class DashboardPage 
{
    products: Locator;
    productsText: Locator;
    cart: Locator;

    constructor(page: Page) 
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string) 
    {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const productCount = await this.products.count();
        for (let i = 0; i < productCount; i++) 
        {
            if (await this.products.nth(i).locator("b").textContent() == productName)  //here the locator will search only in products.nth(i) element whereas page.locator() searches in entire page
            {
                await this.products.nth(i).locator("text=Add To Cart").click(); /*we have written other locators in construtor but not this one because it is chaining. If we want
                to write in constructor then we have to write its full path from parent to child.*/
                break; 
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }
}

module.exports = {DashboardPage};