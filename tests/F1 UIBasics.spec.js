const {test, expect} = require('@playwright/test') 
//const { test: myTest, expect: myExpect } = require('@playwright/test'); then below test will change to myTest, accordingly myExpect

//below is 1 test case, to write a test case write it inside test()
test('First Playwright Test', async ({browser})=> //{browser} is a fixture defined in playwright
{
    //await will tell to wait for this step to complete
    const context = await browser.newContext();  //to open new instance of a browser, if we need cookie or proxy in this new instance we can pass in arguments
    //which browser to open will be defined inside playwright.config.js
    const page = await context.newPage(); //open a new page on browser instance
    await page.goto("https://rahulshettyacademy.com/");
    
})

test('Second Playwright Test', async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
})

test('Login Test Using Incorrect Password and then correcting password', async ({page})=>
{
    const passwordLocator = page.locator("[type='password']"); //await is only required where action is performed
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");  //locate and fill text
    await passwordLocator.fill("Learning@830$3mK1"); 
    await page.locator("input.btn").click();  //locate and click
    
    //after clicking submit button it will wait automatically for time defined (not inside expect) in playwright.config.js for error to come
    console.log(await page.locator("[style*='block']").textContent()); //grab the text and print which comes when we enter incorect username/password
    
    //expect(locator)).toContainText('string')
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    //Password was wrong so clearing it and entering correct value.
    await passwordLocator.fill("") //clearing the password field
    await passwordLocator.fill("Learning@830$3mK2") //entering new password

    await page.locator("input.btn").click(); //click on submit

    //we have a locator that identifies four elements.
    console.log(await page.locator("div.card-body a").first().textContent()); //it will fetch first element, only available for first and last element

    console.log(await page.locator("div.card-body a").nth(1).textContent()); //to fetch 2nd value, nth(0) for first value
    
    /*If we comment above two lines which has textContent() then below allTextContents() will fail
    because textContent has autowait feature but allTextContents dont have this, so after clicking submit
    it will not wait.
    Reason: If we use allTextContents then it gives a list. A list can be empty or can have elements
    that's why playwright thinks it could be an empty list and hence doesnot wait */
    console.log(await page.locator("div.card-body a").allTextContents()); //to fetch all titles

})