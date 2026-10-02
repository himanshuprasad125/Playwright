const {test, expect} = require('@playwright/test')
//comparing actual image with baseline image

test('Snapshot Comparison' , async({page}) =>
{
    //at the first run it will take the basline image and from next time it will compare it with baseline
    await page.goto("https://rahulshettyacademy.com/");
    expect(await page.screenshot()).toMatchSnapshot("BaselineImage.png");

    //it will generate actual, expected & diff image in html report
})