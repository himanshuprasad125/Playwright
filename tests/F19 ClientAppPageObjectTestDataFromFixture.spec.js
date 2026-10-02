const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('./pageObject/PageObjectManager.js');
const {testDataFixture} = require('./utils/TestDataInFixture.js')


    testDataFixture("Using Page Object for", async ({ page , testData}) =>
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
