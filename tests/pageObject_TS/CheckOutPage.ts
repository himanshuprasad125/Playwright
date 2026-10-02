import {expect,Locator,Page} from '@playwright/test';

export class CheckOutPage
{
    cardNumber: Locator;
    expiryMonth: Locator;
    expiryYear: Locator;
    cvv: Locator;
    nameOnCard: Locator;
    enterCoupon: Locator;
    clickCoupon: Locator;
    enterCountry: Locator;
    countryOptions: Locator;
    shipToEmail: Locator;
    placeOrder: Locator;

    constructor(page: Page)
    {
        this.cardNumber = page.locator("[value*='4542']");
        this.expiryMonth = page.locator("select[class*='input']").first();
        this.expiryYear = page.locator("select[class*='input']").last();
        this.cvv = page.locator("input[class='input txt']").first();
        this.nameOnCard = page.locator("input[class='input txt']").last();
        this.enterCoupon = page.locator("[name='coupon']");
        this.clickCoupon = page.locator("[type='submit']");
        this.enterCountry = page.locator("[placeholder*='Country']");
        this.countryOptions = page.locator(".ta-results");
        this.shipToEmail = page.locator(".user__name label");
        this.placeOrder = page.locator(".action__submit ");
    }

    async enterPersomalInformation(cardNumber: string, expiryMonth: string, expiryYear: string, cvv: string, nameOnCard: string, enterCoupon: string)
    {   
        await this.cardNumber.fill(cardNumber);
        await this.expiryMonth.selectOption(expiryMonth);
        await this.expiryYear.selectOption(expiryYear);
        await this.cvv.fill(cvv);
        await this.nameOnCard.fill(nameOnCard);
        await this.enterCoupon.fill(enterCoupon);
        await this.clickCoupon.click();
    }

    async enterShippingInformation(shipToCountry: string, userName: string)
    {
        await this.enterCountry.click();
        await this.enterCountry.pressSequentially(shipToCountry);
        const dynamicOptions = await this.countryOptions; //for all country options after enterting India
        await dynamicOptions.waitFor(); //waitFor() does not return a locator. It returns void/undefined. So creating variable with locator in previous step and doing waitFor in this step
        const dynamicOptionsCount = await dynamicOptions.locator("button").count(); //getting option count
            
        for(let i=0;i<dynamicOptionsCount;i++)
        {
            let text:any;  //text can be null so data type "any"
            text = await dynamicOptions.locator("button").nth(i).textContent();
            if(text.trim() === shipToCountry)  //actual text in webpage has space
            {
                await dynamicOptions.locator("button").nth(i).click();
                break;
            }
        }
        
            //to check if non-editable email above email fill box is same as login email
        await expect(this.shipToEmail).toHaveText(userName);
        
    }

    async checkOut()
    {
        await this.placeOrder.click();
    }
}

module.exports = {CheckOutPage};