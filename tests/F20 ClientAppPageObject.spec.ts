import { test, expect } from '@playwright/test';
import { PageObjectManager } from './pageObject_TS/PageObjectManager.ts';
import {testDataFixture} from './utils_TS/TestDataInFixture.ts';

//first converting JSON to string (using stringigy method) and then converting this string to JavaScript Object (using parse method).
const testDataArray = JSON.parse(JSON.stringify(require('./utils/placeOrderTestData.json'))); // it has two sets of data

for (const testData of testDataArray) //now it will run for two data sets, if only one set of data then remove this loop, also then the test data will be single json not array of json
    {
    test.only(`Using Page Object for ${testData.productName}`, async ({ page }) => //notice the ` (it is different here)
        {
        const pageObjectManager = new PageObjectManager(page);

        const loginPage = pageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testData.userName, testData.password);

        const dashboardPage = pageObjectManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testData.productName);
        await dashboardPage.navigateToCart();

        const cartPage = pageObjectManager.getCartPage();
        await cartPage.isItemVisibleInCart(testData.productName);
        await cartPage.navigateToCheckOut();

        const checkOutPage = pageObjectManager.getCheckoutPage();
        await checkOutPage.enterPersomalInformation(testData.cardNumber, testData.expiryMonth, testData.expiryYear, testData.cvv, testData.nameOnCard, testData.enterCoupon);
        await checkOutPage.enterShippingInformation(testData.shipToCountry, testData.userName);
        await checkOutPage.checkOut();

        //assert if order successfully placed
        const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();
        const orderId = await orderConfirmationPage.isOrderPlaced(testData.orderConfirmationMessage);
        await orderConfirmationPage.navigateToOrders();

        const ordersPage = pageObjectManager.getOrdersPage();
        ordersPage.navigateToOrderedItemSummary(orderId);

        //Assert if original OrderId matching with orderId present in order Summary
        ordersPage.validateOrderSummary(orderId);
    })
}

//Test Data Fixture
testDataFixture.only("Using Page Object for", async ({ page , testData}) =>
        {
        const pageObjectManager = new PageObjectManager(page);

        const loginPage = pageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testData.userName, testData.password);

        const dashboardPage = pageObjectManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testData.productName);
        await dashboardPage.navigateToCart();

        const cartPage = pageObjectManager.getCartPage();
        await cartPage.isItemVisibleInCart(testData.productName);
        await cartPage.navigateToCheckOut();

        const checkOutPage = pageObjectManager.getCheckoutPage();
        await checkOutPage.enterPersomalInformation(testData.cardNumber, testData.expiryMonth, testData.expiryYear, testData.cvv, testData.nameOnCard, testData.enterCoupon);
        await checkOutPage.enterShippingInformation(testData.shipToCountry, testData.userName);
        await checkOutPage.checkOut();

        //assert if order successfully placed
        const orderConfirmationPage = pageObjectManager.getOrderConfirmationPage();
        const orderId = await orderConfirmationPage.isOrderPlaced(testData.orderConfirmationMessage);
        await orderConfirmationPage.navigateToOrders();

        const ordersPage = pageObjectManager.getOrdersPage();
        ordersPage.navigateToOrderedItemSummary(orderId);

        //Assert if original OrderId matching with orderId present in order Summary
        ordersPage.validateOrderSummary(orderId);
    })