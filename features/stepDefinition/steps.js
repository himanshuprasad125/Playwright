const { Given, When, Then } = require('@cucumber/cucumber')
const { PageObjectManager } = require('../../tests/pageObject/PageObjectManager')
const {expect} = require('@playwright/test')


//below (string, string2) --> name can be anything like username, password, etc.
//After we copy below steps, remove "return pending" line and add "async" before function
/*We defined pageObjectManager in only Given. Now how other methods (when, then) will get knowledge of this
We have 2 options: first is to define them globally outside Given. Second is to use World constructor; means using this.pageObjectManager
everywhere as shown below, in this way all methods under one scenarion have knowledge of these variables.*/

//By default cucumber gives a max of 5s to complete a method (given, when, then). To override this we can define custom timeout as below
Given('a login to Ecommerce application with {string} and {string}', {timeout: 10000}, async function (userName, password) {

    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);
});

When('Add {string} to Cart', async function (productName) {
    const dashboardPage = this.pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.pageObjectManager.getCartPage();
    await cartPage.isItemVisibleInCart(productName);
    await cartPage.navigateToCheckOut();
});

When('Enter valid details and Place the Order for {string}', async function (userName) {
    const checkOutPage = this.pageObjectManager.getCheckoutPage();
    await checkOutPage.enterPersomalInformation("1111 2222 3333 4444", "07", "25", "123", "Himanshu Prasad", "rahulshettyacademy");
    await checkOutPage.enterShippingInformation("India", userName);
    await checkOutPage.checkOut();
});

Then('Verify order in present in the OrderHistory', async function () {
    const orderConfirmationPage = this.pageObjectManager.getOrderConfirmationPage();
    const orderId = await orderConfirmationPage.isOrderPlaced("Thankyou for the order.");
    await orderConfirmationPage.navigateToOrders();
    const ordersPage = this.pageObjectManager.getOrdersPage();
    ordersPage.navigateToOrderedItemSummary(orderId);
    ordersPage.validateOrderSummary(orderId);
});

Given('a login to Second Ecommerce application with {string} and {string}', async function (userName, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator("input#username").fill(userName);
    await this.page.locator("[type='password']").fill(password); 
    await this.page.locator("input.btn").click();
});

Then('Verify Error Message is displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username/password.');
});