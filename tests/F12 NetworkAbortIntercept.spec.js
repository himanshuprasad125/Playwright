const { test, expect, request } = require('@playwright/test')

/*Replacing actual API request with custom API request. Here we are changing the orderId of GET Request
to validate if we are getting error message or not for trying to access order of another customer*/

test('Abort API Response Intercept', async ({ page }) => {

    /*here we are blocking all API calls with css extension from reaching the browser
    we can also block a particluar API call as well */
    page.route("**/*.css" , route => route.abort()); //here the backslash is inside a URL and * is wildcard
    //if we need to block multile extensions like jpg, pdf, etc then use {jpg, pdf, css} instead of just css

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.pause();
})