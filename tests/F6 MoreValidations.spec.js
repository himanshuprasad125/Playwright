/*Create a brand new event from the admin panel, then complete a booking for that event, 
and finally verify the seat count drops by exactly 1.*/

const {test, expect} = require('@playwright/test')

test('Validations' , async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //checking visibilty of an element
    const element = page.locator("#displayed-text");
    await expect(element).toBeVisible(); //here element is visible
    await page.locator("#hide-textbox").click();  //hididng the element
    await expect(element).toBeHidden();  //checking if element is hidden


    //Handle Java/Javascript related popups/dialog --> these cannot be located like other html elements
    
    /*page.on starts listening the event which is provided as argument inside '', in this case 
    event=dialogue, after the argument a variable(name can be anything) is written on which action 
    of accept/dismiss will be performed */
    page.on("dialog",dialog => dialog.accept());   //starting listerner here and activating the popup in next step so that listener starts listening
    await page.locator("#confirmbtn").click();

    //Hover action
    await page.locator("#mousehover").hover();

    //Handle Frames -- if tagname is iframe then it is a different frame on the webpage
    const framePage = page.frameLocator("#courses-iframe")   //changing to frame mode for handling it
    
    //now any element inside the frame will be accesed using framePage variable.
    /*this locator will resolve 2 elements (one is visible and other invisible), here we are 
    clicking on visible using :visible inside locator*/
    await framePage.locator("li a[href*='lifetime']:visible").click();  //to find the locator open the link(actual website) of frame to grab locator because on frame we cannot see the locator on selector hub.

    //fetching text from frame
    const frameText = await framePage.locator(".text h2").textContent();
    console.log(frameText.split(" ")[1]);
})