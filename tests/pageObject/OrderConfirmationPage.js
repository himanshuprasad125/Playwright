const { expect } = require('@playwright/test');

class OrderConfirmationPage
{   
    constructor(page)
    {
        this.message = page.locator(".hero-primary");
        this.orderCreated = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orders = page.locator("ul [routerlink='/dashboard/myorders']");
    }

    async isOrderPlaced(orderConfirmationMessage)
    {
        await expect(this.message).toHaveText(orderConfirmationMessage);
        const orderId = await this.orderCreated.textContent();
        return orderId;
    }

    async navigateToOrders()
    {
        await this.orders.click();
    }
}

module.exports = {OrderConfirmationPage};