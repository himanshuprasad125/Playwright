const { test, expect, request } = require('@playwright/test')

/*Replacing actual API request with custom API request. Here we are changing the orderId of GET Request
to validate if we are getting error message or not for trying to access order of another customer*/

test('Track API Request/Response Intercept', async ({ page }) => {

    //We can track API request/response (all parameters) calls made during interaction made on web

    page.on('request' , request => console.log(request.url()));  //here printing all API request URLs
    page.on('response' , response => console.log(response.status())) //here printing all API response status codes.

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.pause();
})