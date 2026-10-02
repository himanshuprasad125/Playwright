const {test, expect} = require('@playwright/test');

test('End to End Ecommer Flow', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("himanshuprasad@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Himanshu1");
    await page.getByRole("button", {name: "Login"}).click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor(); //no getBy locator for an element which has multiple locators inside it
    const products = page.locator(".card-body"); //same reason as above
    const productName = "ZARA COAT 3";
    
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click(); //we have other button whose name contains cart so tranversing from parent to child, its tagName was li so role is listitem

    /*here the productName=ZARA COAT 3 is on two page but these two have different tag names
    so we have used tagname to identify it.*/
    await page.locator("div li[class*='items']").first().waitFor(); 

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();  
    
    await page.getByRole("button", {name:"Checkout"}).click();
    
    await page.getByPlaceholder("Select Country").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    
    await page.getByRole("button", {name:"India"}).nth(1).click() //nth(0) was British Indian Ocean Territory

    await page.getByText("PLACE ORDER").click();
    
    //assert if order successfully placed
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); //grabbing orderId
    const trimmedOrderId = await orderId.slice(2,27);
    console.log(trimmedOrderId);

    await page.getByRole("button",{name:"ORDERS"}).click();

    const orders = await page.locator("tbody");
    await orders.waitFor();

    await page.locator("tbody tr").filter({hasText:trimmedOrderId}).getByRole("button",{name:"View"}).click();

    //Assert if OrderId matching
    await expect(page.getByText(trimmedOrderId)).toBeVisible();

})