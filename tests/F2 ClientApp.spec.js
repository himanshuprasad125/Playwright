const {test, expect} = require('@playwright/test');

test('Automation Prtactice', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("himanshuprasad@gmail.com");
    await page.locator("#userPassword").fill("Himanshu1");
    await page.locator("#login").click();
    
    /* In previous example we were using textContent() before allTextContent and hence 
    it was waiting waiting automatically. But here we are only using allTextContent so to make it wait
    we are using waitForLoadState method and in parameter networkidle. It means when network becomes idle
    i.e. all data loaded through API response which came from API server endpoint*/
    await page.waitForLoadState("networkidle");
    console.log(await page.locator(".card-body b").allTextContents());

    /*if the above waitForLoadState("networkidle") doesnot work correctly then we can use waitFor()
    but it waits for the locator which we provide to be visible, so the locator which we provide 
    must return single element. If the locator return multilple elements then we can use first or last method*/
    
    //Syntax --> await page.locator(".card-body b").first().waitFor();
})

test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    
    const dropdowns = page.locator("select.form-control"); //locating dropdown

    await dropdowns.selectOption("consult"); //select option from dropdown options

    await page.locator("span.checkmark").last().click();
    await page.locator("#okayBtn").click();

    await expect(page.locator("span.checkmark").last()).toBeChecked(); //asserts if correct radio button is selected

    /*another way to assert if correct radio button is selected, but this prints true if selected 
    other false, so not very useful as we wont be checking logs for each test case 
    when running a automation test.*/
    console.log(await page.locator("span.checkmark").last().isChecked()); 

    await page.locator("#terms").click(); //clickng on check box
    await expect(page.locator("#terms")).toBeChecked(); //asserts if check box is checked
    await page.locator("#terms").uncheck(); //removing click

    /*asset if check box is not checked, there is no ready made method so we combined two 
    methods(is checked will return false and we are verifying if it is false or not)*/
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); 

    //checking if blinking text
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText"); 
})

test('Child Window', async({browser}) =>
{
    //we are starting with browser intead of page as we will open two pages
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    

    /*Below we have 2 statments, first waits and listens to a new page which opens and second click
    to open a new page. We want to run these two parallely because these two are linked with each other as
    first one litens and second one opens new page. So we have made it as part of array Promise and this make
    sures that all statements inside it are executed before proceeding to next step. we dont want 
    that second should wait for completion of first because first will only be fulfilled when second is done
    that's why no await use. const[] should have return types of all statements inside the array
    here first will return a new page so newPage and second will not return anything
    First we have multiple pages to open then we can place const[newPage,newPage2,newPage3,so-on]
    */
    const [newPage] = await Promise.all(
    [
        context.waitForEvent("page"), //it waits for new page
        documentLink.click() //this opens another page
    ])

    const text = await newPage.locator("[class*='red']").textContent(); //Grabbing a line on second page
    console.log(text);

    const email = text.split("@")[1].split(" ")[0]; //Getting email out of line
    console.log(email);
    
    await page.locator("#username").fill(email); //entering email fetched from second page to first page

})


test('End to End Ecommer Flow', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("himanshuprasad@gmail.com");
    await page.locator("#userPassword").fill("Himanshu1");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor(); //above network idle step was not working as expected so added it
    const products = page.locator(".card-body"); //it return multiple items
    const productCount = await products.count(); //return the count of items
    const productName = "ZARA COAT 3";
    //for loop to iterate and find the desired element
    
    for(let i=0;i<productCount;i++)
    {
        if(await products.nth(i).locator("b").textContent() == productName)  //here the locator will search only in products.nth(i) element whereas page.locator() searches in entire page
        {
            await products.nth(i).locator("text=Add To Cart").click(); //clicking desired element
            break; //come out of loop when desrired element is found
        }
    }
    
    await page.locator("[routerlink*='cart']").click();

    /*here the productName=ZARA COAT 3 is on two page but these two have different tag names
    so we have used tagname to identify it.*/
    await page.locator("div li[class*='items']").first().waitFor(); /*Also isVisible() doesnot support auto wait
    so using this step so that it waits for first item to load*/

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //it returns boolean value
    expect(bool).toBeTruthy(); //checking if above returned boolean value is true
    
    await page.locator("text=Checkout").click();

    await page.locator("[value*='4542']").fill("1111 2222 3333 4444");
    await page.locator("select[class*='input']").first().selectOption("07");
    await page.locator("select[class*='input']").last().selectOption("25");
    await page.locator("input[class='input txt']").first().fill("123");
    await page.locator("input[class='input txt']").last().fill("Himanshu Prasad");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    
    /*in dynamic dropdowns when we type letters there is a list from which we can choose,
    but it appears only when we type slowly not paste entire word using fill() method.*/
    await page.locator("[placeholder*='Country']").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dynamicOptions = await page.locator(".ta-results");
    await dynamicOptions.waitFor(); //waitFor() does not return a locator. It returns void/undefined. So creating variable with locator in previous step and doing waitFor in this step
    const dynamicOptionsCount = await dynamicOptions.locator("button").count(); //getting option count
    
    for(let i=0;i<dynamicOptionsCount;i++)
    {
        const text = await dynamicOptions.locator("button").nth(i).textContent();
        if(text === " India")  //actual text in webpage has space
        {
            await dynamicOptions.locator("button").nth(i).click();
            break;
        }
    }

    //to check if non-editable email above email fill box is same as login email
    await expect(page.locator(".user__name label")).toHaveText("himanshuprasad@gmail.com");
    await page.locator(".action__submit ").click();
    
    //assert if order successfully placed
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); //grabbing orderId
    console.log(orderId);
    
    await page.locator("ul [routerlink='/dashboard/myorders']").click();

    const orders = await page.locator("tbody");
    await orders.waitFor();
    const ordersCount = await page.locator("th[scope='row']").count();
    console.log(ordersCount);

    for (let i=0;i<ordersCount;i++)
    {
        const rowOrderId = await orders.locator("[scope='row']").nth(i).textContent();
        if(orderId.includes(rowOrderId))
        {
            await orders.locator(".btn-primary").nth(i).click();
            break;
        }
    }

    //Assert if OrderId matching
    const OrderIdOnSummary = await page.locator(".col-text").textContent(); //textContent() has autowait
    expect(orderId.includes(OrderIdOnSummary)).toBeTruthy();

})