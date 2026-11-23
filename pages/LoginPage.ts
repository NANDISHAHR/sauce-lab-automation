import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    readonly page: Page
    readonly baseURL: string
    readonly usernameTextBox: Locator
    readonly passwordTextBox: Locator
    readonly loginButton : Locator

    constructor(page: Page) {
        this.page = page
        this.baseURL = process.env.BASE_URL ?? ''
        this.usernameTextBox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextBox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
        
    }

    async gotoSauceDemo() {
        if (!this.baseURL) {
            throw new Error('BASE_URL environment variable is not defined')
        }
        await this.page.goto(this.baseURL)
    }

    async doLogin(username: string, password:string) {
        await this.usernameTextBox.fill(username)
        await this.passwordTextBox.fill(password)
        await this.loginButton.click()
    }
}