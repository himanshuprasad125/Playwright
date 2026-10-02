const { test, expect, request } = require('@playwright/test')

/*Replacing actual API request with custom API request. Here we are changing the orderId of GET Request
to validate if we are getting error message or not for trying to access order of another customer*/

test('Network API Request Intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("himanshuprasad@gmail.com");
    await page.locator("#userPassword").fill("Himanshu1");
    await page.locator("#login").click();
    await page.locator("ul [routerlink='/dashboard/myorders']").click();

    /*we are intercepting the actual request URL (as it is GET call) with * at end and replacing it 
    with new URL which has orderId which is not valid for this user. If it was a POST call then 
    we can modify body & headers too.*/
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route =>
        route.continue({url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a9c281ae7cd69710fc19404"})
    );
    await page.locator("button:has-text('View')").first().click();
    await page.pause();

})