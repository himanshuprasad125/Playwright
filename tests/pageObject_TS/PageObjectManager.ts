import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {CheckOutPage} from './CheckOutPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {OrdersPage} from './OrdersPage';
import { Page } from '@playwright/test';

export class PageObjectManager
{
    /*Previouly we have placed all the objects of Page Object classes into the test file. But now this PageObjectManager will handle 
    all the objects*/

    page: Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    checkOutPage : CheckOutPage;
    orderConfirmationPage : OrderConfirmationPage;
    ordersPage : OrdersPage;
    
    constructor(page: Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkOutPage;
    }

    getOrderConfirmationPage()
    {
        return this.orderConfirmationPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}

module.exports = {PageObjectManager};


