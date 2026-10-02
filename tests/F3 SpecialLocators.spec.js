const {test, expect} = require('@playwright/test')

test('Playwright Special Locator' , async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    /* If any text written inside the label tagName then we can use getByLabel(). Playwirght will check the operation mentioned (click in this case)
    and automatically sense if any clickable thing is there in that locator range. As in this case
    there are two sibling html line (one for checkbox and another for this label)*/
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Male"); //select option can only be used when there is select tagName

    //Sometimes getByLabel() doesnot work with input fields but it works fine with checkboxes, radio buttons or where selections are made
    //For radio buttons and checkboxes, check() can also be used intead of click();

    //If any locator have placeholder attribute then we can use getByPlaceholder() method to locate that
    
    await page.getByPlaceholder("Password").fill("Himanshu123");

    /*getByRole() method to identify element based on its role and text on button
    Ex: We have submit button with button having text/name=Submit so we used as below 
    if either tagName or className is button/btn then we can use role=button*/
    await page.getByRole("button", {name: 'Submit'}).click();

    //getByText() method to identify element based on its text
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    
    await page.getByRole("link", {name: 'Shop'}).click(); //getByRole based on link name

    /*if a locator returns multiple elements, we can filter a element based upon certain criteria like text,
    earlier we done it using for loop to iterate over all elemnets, also the filter will only check
    inside the locator which was provided. After filtering the item, if there are multiple
    elements like button, link, etc we can apply another methods like getByRole to select required
    button/link and if there is single button inside the item then dont need to put button/link name*/
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
})