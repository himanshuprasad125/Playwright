import {expect,Locator,Page} from '@playwright/test';

export class OrdersPage
{

    orderTable: Locator;
    ordersInTable: Locator;
    orderSummary: Locator;

    constructor(page: Page)
    {
        this.orderTable = page.locator("tbody");
        this.ordersInTable = page.locator("th[scope='row']");
        this.orderSummary = page.locator(".col-text");
    }

    async navigateToOrderedItemSummary(orderId: any) //we are not sure if this will be number or string
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

    async validateOrderSummary(orderId: any)
    {
        const OrderIdOnSummary = await this.orderSummary.textContent();
        expect(orderId.includes(OrderIdOnSummary)).toBeTruthy();
    }
}

module.exports = {OrdersPage};