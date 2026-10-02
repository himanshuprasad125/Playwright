const {test, expect, request} = require('@playwright/test') 
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail: "himanshuprasad@gmail.com", userPassword: "Himanshu1"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}; //click on view button on order page, a new page will open check its URL for product id
const apiBaseURL = "https://rahulshettyacademy.com";

let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();  //as we did while setting browser for web page testing; we can pass any proxy information, etc in arguments if we want to start the session with additonal data
    const apiUtils = new APIUtils(apiContext,loginPayload,apiBaseURL);
    response = await apiUtils.createOrder(createOrderPayload);
})

test('API usage in Web Testing' , async({page}) =>
{
    page.addInitScript(value => 
    {
        window.localStorage.setItem('token',value);
    }, response.token );  

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState("networkidle");
    console.log(await page.locator(".card-body b").allTextContents());

    //checking if previously created order is present on my order page
    await page.locator("ul [routerlink='/dashboard/myorders']").click();
    const orders = await page.locator("tbody");
    await orders.waitFor();
    const ordersCount = await page.locator("th[scope='row']").count();

    for (let i=0;i<ordersCount;i++)
    {
        const rowOrderId = await orders.locator("[scope='row']").nth(i).textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await orders.locator(".btn-primary").nth(i).click();
            break;
        }
    }
})