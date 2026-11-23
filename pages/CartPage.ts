import {Locator, Page, test} from '@playwright/test'
import { parseEnv } from 'node:util'

export class CartPage {

    readonly page: Page
    readonly cartButton: Locator
    readonly productName: Locator
    readonly cartItem: Locator
    readonly checkOutButton : Locator

    constructor(page: Page) {
        this.page = page
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.productName = page.locator('[data-test="cart-list"] [data-test="inventory-item-name"]')
        this.cartItem = page.locator('[data-test="inventory-item"]')
        this.checkOutButton = page.getByRole('button', {name: 'CheckOut'})
    }

    async gotoCart() {
        await this.cartButton.click()
    }

    async getAllProductNames(): Promise<string[]> {
      return await this.productName.allTextContents()
    }

    async removeProduct(productName: string) {
      const item = this.getCartItem(productName)
      await item.getByRole('button', {name: 'Remove'}).click()
    }

    getCartItem(productName: string) {
        return this.cartItem.filter({hasText : productName})
    }
    async getCartItemCount() : Promise<number> {
        return await this.cartItem.count()
    }

    async clickOnCheckOut() {
        await this.checkOutButton.click()
    }
}