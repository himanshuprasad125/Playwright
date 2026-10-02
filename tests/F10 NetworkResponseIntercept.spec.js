const {test, expect, request} = require('@playwright/test') 
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail: "himanshuprasad@gmail.com", userPassword: "Himanshu1"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}; //click on view button on order page, a new page will open check its URL for product id
const apiBaseURL = "https://rahulshettyacademy.com";

const customAPIResponse = { data: [], message: "No Orders" }; // it is JS Object, not JSON
let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();  //as we did while setting browser for web page testing; we can pass any proxy information, etc in arguments if we want to start the session with additonal data
    const apiUtils = new APIUtils(apiContext,loginPayload,apiBaseURL);
    response = await apiUtils.createOrder(createOrderPayload);
})

test('Network Interception' , async({page}) =>
{
    page.addInitScript(value => 
    {
        window.localStorage.setItem('token',value);
    }, response.token );  

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //We are using route() method to intercept the actual response and replace it with custom response which will be used further
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route =>
    {
        // route.fulfill() doesn't accept arbitrary variable names, It expects a specific object structure
        route.fulfill(
            {
                body: JSON.stringify(customAPIResponse) //replacing actual respone which has multiple orders with custom response which has no orders
            }
        )

    })

    //in below step the above URL will be called so we are telling it before that whenever URL is encountered mock that
    await page.locator("ul [routerlink='/dashboard/myorders']").click();
    const message = await page.locator(".mt-4").textContent();
    console.log(message);
})