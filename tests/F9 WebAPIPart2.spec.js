const {test, expect, request} = require('@playwright/test') 
const {APIUtils} = require('./utils/APIUtils');

/* Sometimes it may occur that after login we get multiple key value pairs intead of a single token.
in that case it is difficult to collect all those individually and inject them individually. So Playwright
gives a technique to collect all those key values and create a json out of it and then inject that json
into the newContext(); then that newContext() can be used to open browser for every test case
A newContext() can have multiple pages, each page representing a browser tab*/

let webContext;

test.beforeAll( async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    //Login API call
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("himanshuprasad@gmail.com");
    await page.locator("#userPassword").fill("Himanshu1");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");

    await context.storageState({path : 'state.json'}); //it will create a json file in test folder, this will have all key value pair data required for login
    webContext = await browser.newContext({storageState : 'state.json'});
})


test('Login using WebContext' , async() => //we removed page fixture from here as we are generating it on runtime
{
    const page = await webContext.newPage(); //this page has all the information required for login
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState("networkidle");
    console.log(await page.locator(".card-body b").allTextContents());

    await page.pause();
})