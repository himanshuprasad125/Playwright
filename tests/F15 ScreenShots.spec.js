const {test, expect} = require('@playwright/test')

test('Full Page ScreenShot' , async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //checking visibilty of an element
    const element = page.locator("#displayed-text");
    await expect(element).toBeVisible(); //here element is visible
    await page.locator("#hide-textbox").click();  //hididng the element
    await page.screenshot({path : 'FullScreenshot.png'});  //screenshot is taken here  
    await expect(element).toBeHidden();  //checking if element is hidden

})

test('Partial(Element Level) ScreenShot' , async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //checking visibilty of an element
    const element = page.locator("#displayed-text");
    await expect(element).toBeVisible(); //here element is visible
    await element.screenshot({path : 'PartialScreenshot.png'});  //screenshot is taken here  

})