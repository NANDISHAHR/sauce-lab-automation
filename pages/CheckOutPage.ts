import { Locator, Page } from "@playwright/test";

export class CheckOutPage {
  readonly page: Page;
  readonly firstNameTextBox: Locator;
  readonly lastnameTextBox: Locator;
  readonly zipCodeTextBox: Locator;
  readonly continueOverviewButton: Locator;
  readonly subTotalText: Locator
  readonly taxText: Locator
  readonly totalText: Locator
  readonly finishButton : Locator
  readonly completeHeaderButton : Locator

  constructor(page: Page) {
    this.page = page;
    this.firstNameTextBox = page.getByPlaceholder("First Name");
    this.lastnameTextBox = page.getByPlaceholder("Last Name");
    this.zipCodeTextBox = page.getByPlaceholder("Zip/Postal Code");
    this.continueOverviewButton = page.getByRole("button", {
      name: "continue",
    });
    this.subTotalText = page.locator('[data-test="subtotal-label"]')
    this.taxText = page.locator('[data-test="tax-label"]')
    this.totalText = page.locator('[data-test="total-label"]')
    this.finishButton = page.getByRole('button', {name: 'Finish'})
    this.completeHeaderButton = page.locator('[data-test="complete-header"]')
  }

  async fillInformation(firstName: string, lastname: string, zipCode: string) {
    await this.firstNameTextBox.fill(firstName);
    await this.lastnameTextBox.fill(lastname);
    await this.zipCodeTextBox.fill(zipCode);
  }

  async continueToOverviewPage() {
    await this.continueOverviewButton.click();
  }

  async getSubTotal() : Promise<number> {
    const text = await this.subTotalText.textContent()

    if(text === null ) {
        throw new Error("Subtotal text was not found")
    }
   
    return parseFloat(text.replace('Item total: $', ''))
  }

  async getTax(): Promise<number> {
    const tax = await this.taxText.textContent()

    if(tax === null) {
        throw new Error("Tax text was not found")
    }
    return parseFloat(tax.replace('Tax: $',''))
  }

  async getTotal() :Promise<number> {
    const total = await this.totalText.textContent()
    if(total === null ){
        throw new Error('Total text was not found')
    }
    return parseFloat(total.replace('Total: $',''))
  }

  async clickFinishButton() {
    await this.finishButton.click()
  }

  async getCompleteHeader() : Promise<string | null> {
     return await this.completeHeaderButton.textContent()
  }
}
