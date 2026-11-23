import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page
    readonly headingText: Locator
    readonly productCards: Locator
    readonly cartBage: Locator
    readonly sortDropDown: Locator
    readonly itemPrices: Locator

    constructor(page: Page) {
        this.page = page
        this.headingText = page.locator('.title')
        this.productCards = page.locator('.inventory_item')
        this.cartBage = page.locator('.shopping_cart_badge')
        this.sortDropDown = page.locator('[data-test="product-sort-container"]')
        this.itemPrices = page.locator('[data-test="inventory-item-price"]')
        
    }

    getProductCard(productName: string): Locator  {
       return this.productCards.filter({hasText: productName})
    }

    async addProductToCart(productName: string) {
        const product = this.getProductCard(productName)
        await product.getByRole('button', {name: 'Add to cart'}).click()
    }

    async getCartCount(): Promise<number> {
        const hasBadge = await this.cartBage.count()
        if(hasBadge === 0) return 0
        return parseInt(((await this.cartBage.textContent())) ?? "0" , 10)
    }

    async sortProductsBy(optionValue: string) {
       await this.sortDropDown.selectOption(optionValue)
    }

    async getAllPrices(): Promise<number[]> {
       const priceText =  await this.itemPrices.allTextContents()
       return priceText.map((p) => parseFloat(p.replace('$', "")))
    }
}