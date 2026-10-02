const {expect} = require('@playwright/test');

class OrdersPage
{
    constructor(page)
    {
        this.orderTable = page.locator("tbody");
        this.ordersInTable = page.locator("th[scope='row']");
        this.orderSummary = page.locator(".col-text");
    }

    async navigateToOrderedItemSummary(orderId)
    {
        const orders = await this.orderTable;
        await orders.waitFor();
        const ordersCount = await this.ordersInTable.count();

        for (let i=0;i<ordersCount;i++)
        {
            const rowOrderId = await orders.locator("[scope='row']").nth(i).textContent();
            if(orderId.includes(rowOrderId))
            {
                await orders.locator(".btn-primary").nth(i).click();
                break;
            }
        }
    }

    async validateOrderSummary(orderId)
    {
        const OrderIdOnSummary = await this.orderSummary.textContent();
        expect(orderId.includes(OrderIdOnSummary)).toBeTruthy();
    }
}

module.exports = {OrdersPage};