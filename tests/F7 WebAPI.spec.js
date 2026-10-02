

const {test, expect, request} = require('@playwright/test') 

//above request keyword is for API testing

const loginPayload = {userEmail: "himanshuprasad@gmail.com", userPassword: "Himanshu1"};
const createOrderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}; //click on view button on order page, a new page will open check its URL for product id
const apiBaseURL = "https://rahulshettyacademy.com";
let token;
let orderId;

test.beforeAll( async()=>
{
    //Login API call
    const apiContext = await request.newContext();  //as we did while setting browser for web page testing; we can pass any proxy information, etc in arguments if we want to start the session with additonal data
    const loginResponse = await apiContext.post(apiBaseURL+"/api/ecom/auth/login", {data:loginPayload} ); //making API call and storing response in loginResponse variable
    expect(loginResponse.ok()).toBeTruthy();  //asserting API response code
    const loginResponseJson = await loginResponse.json(); //grabbing response and stroring it as json
    token = loginResponseJson.token;  //grabbing token value from Json

    //Create Order API call
    const createOrderHeaders = {'authorization': token, 'content-type': 'application/json'};
    const createOrderResponse = await apiContext.post(apiBaseURL+"/api/ecom/order/create-order", {data : createOrderPayload , headers : createOrderHeaders} );
    const createOrderResponseJson = await createOrderResponse.json();
    orderId = createOrderResponseJson.orders;
})

/*doing main validations (all products visibilty and ordered product in my orders) using UI testing 
and doing pre-requisites (login and order creation) using API call*/
test('API usage in Web Testing' , async({page}) =>
{
    //setting token value in local storage, select sessionStorage instead of localStorage according to code design
    page.addInitScript(value => 
    {
        window.localStorage.setItem('token',value);
    }, token );  //this token value will be picked by value variable, and from that it will be passed to key value pair ('token',value)
    
    //now no user/password required to login from login page
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
        if(orderId.includes(rowOrderId))
        {
            await orders.locator(".btn-primary").nth(i).click();
            break;
        }
    }
    await page.pause();
})