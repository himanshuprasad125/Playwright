const base = require('@playwright/test'); //this time we named it as base instead of test
const loginPayload = {userEmail: "himanshuprasad@gmail.com", userPassword: "Himanshu1"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const apiBaseURL = "https://rahulshettyacademy.com";
const {APIUtils} = require("./APIUtils");
const {request} = require('@playwright/test');

/*test Can use built-in fixtures like page, browser, context, request ; but here we are creating a customer fixture so using base
because by default test cannot use these custom fixtures*/

exports.customTest = base.test.extend( //extending original test and defining its scope

    {
        authenticatedPage: async ({ browser }, use) =>    //customer fixture defined, test cannot access this but customTest can
        {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await page.locator("#userEmail").fill("himanshuprasad@gmail.com");
            await page.locator("#userPassword").fill("Himanshu1");
            await page.locator("#login").click();
            await page.waitForLoadState("networkidle");
            await use(page);   //all steps will be done on page and in this step all data will be sent to authenticatedPage
            /*above line is called tear down as this tears the fixture in two parts, because lines written above it will be executed
            while executing fixtures and lines written below it will be executed after executing the whole test method. In this case the whole customTest method*/

            await context.close();
        },

        createOrder : async ({} , use) =>
        {
            const apiContext = await request.newContext();  
            const apiUtils = new APIUtils(apiContext,loginPayload,apiBaseURL);
            const response = await apiUtils.createOrder(createOrderPayload);
            await use(response);         //it will be sent back to createOrder

            await apiContext.dispose();
        },

        testDataForOrder :  //this is fixture is defined as simple JS object whereas above fixtures were defined as methods.
        {
            productName : "ADIDAS ORIGINAL"
        }
    }
)

