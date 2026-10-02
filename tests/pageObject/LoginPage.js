class LoginPage
{
    constructor(page)
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

    async validLogin(usernameValue , passwordValue)
    {
        await this.userName.fill(usernameValue);
        await this.password.fill(passwordValue);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }

}

module.exports = {LoginPage};