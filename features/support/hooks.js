const { Before, After, BeforeStep, AfterStep, BeforeAll, AfterAll, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test') //here importing playwright 
const { PageObjectManager } = require('../../tests/pageObject/PageObjectManager');
const path = require("node:path");

BeforeAll(function ()  //Executed once before all scenarions
{
    console.log("Starting Execution for Feature");
});

Before(async function ({pickle})
{
    //reusable methods before every scenario
    console.log("Scenarion Execution Started for: " + pickle.name)
    const browser = await playwright.chromium.launch( {headless : false});
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.pageObjectManager = new PageObjectManager(this.page); //this.pageObjectManager will be sent to steps.js using World Constructor
});

//pickle contains information about the whole scenario, including its steps. pickleStep represents one individual executable step.

BeforeStep(function ({pickleStep}) //grabbing step name
{
    console.log("Starting execution for step: " + pickleStep.text);
})

AfterStep(async function ({result,pickleStep}) //grabbing step execution result
{
    console.log("Execution completed for step: " + pickleStep.text);
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'FailedStepScreenshot.png'}); //taking screenshot if step fails ; using World Constructor methodology for page information
    }
})



After(function ({pickle})
{
    //will run after each scenario
    console.log("Scenario Execution Completed for: " + pickle.name);
});

AfterAll(function ()  //Executed once after all scenarions
{
    console.log("Completed Execution for Feature");
});