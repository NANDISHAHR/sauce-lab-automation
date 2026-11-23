import { test } from "../fixtures/pom-fixtures";
import { expect } from "@playwright/test";
import { testdata } from "../testdata/account";
import { data } from "../testdata/constant";

test.beforeEach("Open sauce demo web application", async ({ loginPage }) => {
  await loginPage.gotoSauceDemo();
});

test("Cart badge updates when adding products", async ({
  loginPage,
  page,
  homePage,
}) => {
  await test.step("Login to sauce demo application", async () => {
    await loginPage.doLogin(
      testdata.standardUser.username,
      testdata.standardUser.password,
    );
    await expect(homePage.headingText).toHaveText(data.text.productTitle);
    await expect(page).toHaveURL(
      `${process.env.BASE_URL}${data.urls.inventory}`,
    );
    expect(await page.title()).toBe(data.text.title);
  });

  await test.step("Add a product to cart", async ({}) => {
     await homePage.addProductToCart(data.text.sauceLabsBackpackText)
     await homePage.addProductToCart(data.text.sauceLabsBikeLightText)
     const cartCount = await homePage.getCartCount()
     expect(cartCount).toBe(2)
  });

  await test.step('Products can be sorted by price low to high', async({}) => {
    await homePage.sortProductsBy(data.sortOptions.priceLowToHigh)
    const prices = await homePage.getAllPrices()
    const sortedPrice = [...prices].sort((a, b) => a-b);
    expect(prices).toEqual(sortedPrice)
  })
});
