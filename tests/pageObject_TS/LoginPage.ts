import {Locator,Page} from '@playwright/test';

export class LoginPage
{

    page: Page;
    userName: Locator;
    password: Locator;
    signInButton: Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("#login");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(usernameValue: string , passwordValue: string)
    {
        await this.userName.fill(usernameValue);
        await this.password.fill(passwordValue);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }

}

module.exports = {LoginPage};