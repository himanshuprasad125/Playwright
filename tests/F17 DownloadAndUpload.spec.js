const { test, expect } = require('@playwright/test')
//comparing actual image with baseline image

test('Download File', async ({ page }) => {
    // Navigate to the page containing the download button
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // Start listening for the download event before clicking the download button, here download is a Playwright keyword
    const downloadPromise = page.waitForEvent("download");

    // Click the button to trigger the file download
    await page.locator("#downloadButton").click();

    // Wait for the download to complete and get the Download object
    const download = await downloadPromise;

    // Get and print the filename suggested by the website
    console.log("File:", await download.suggestedFilename());

    // Save the downloaded file to the specified location (download folder in Project)
    await download.saveAs("downloads/myfile.xlsx");
})

test('Upload File', async ({ page }) => {
    // Navigate to the page containing the download button
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    /*below step is to handle the popup window which opened after clicking on upload button, below setInputFiles will only work when
    upload button element has type="file"*/
    await page.locator("#fileinput").setInputFiles("C:\\Personal\\Project\\Udemy\\Playwright\\Upload File\\ForUpload.xlsx");
    await page.pause();
})