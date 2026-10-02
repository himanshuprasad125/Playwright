const { expect } = require('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartItems = page.locator("div li[class*='items']");
        this.checkOut = page.locator("text=Checkout");
    }

    async isItemVisibleInCart(productName)
    {
        await this.cartItems.first().waitFor(); /*Also isVisible() doesnot support auto wait so using this step so that it waits for first item to load*/
        
        //Locators in constructor → use when the locator is fixed/static for that page.
        //Locators inside a method → use when the locator depends on input/test data that changes.
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible(); //it returns boolean value
        expect(bool).toBeTruthy(); //checking if above returned boolean value is true
    }

    async navigateToCheckOut()
    {
        await this.checkOut.click();
    }
}

module.exports = {CartPage};