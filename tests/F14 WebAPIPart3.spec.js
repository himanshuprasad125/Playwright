const { expect } = require('@playwright/test');
const {customTest} = require('./utils/WebAPIPart3CustomFixture');

/*Previouly we saw how to inject a single token from API response to other Web calls. We also saw if there are mutliple tokens/auth
we can pull them as json and can inject the complete json file for other Web calls. Here we will see how to do this using custom fixtures*/

/* A fixture is a reusable setup that provides the things your tests need—such as a browser page, logged-in user, 
test data, or API client. */

customTest("Custom Fixture" , async ({authenticatedPage , createOrder , testDataForOrder}) => //while executing Playwright first executes the custom fixture
{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("ul [routerlink='/dashboard/myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();  //here createOrder internally uses returned values of response
    console.log(testDataForOrder.productName);   //just printing the productName
})
