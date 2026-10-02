const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckOutPage} = require('./CheckOutPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {OrdersPage} = require('./OrdersPage');

class PageObjectManager
{
    /*Previouly we have placed all the objects of Page Object classes into the test file. But now this PageObjectManager will handle 
    all the objects*/

    constructor(page)
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


