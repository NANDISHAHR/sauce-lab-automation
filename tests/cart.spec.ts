import { test } from "../fixtures/pom-fixtures";
import { expect } from "@playwright/test";
import { testdata } from "../testdata/account";
import { data } from "../testdata/constant";

test.beforeEach("Open sauce demo web application", async ({ loginPage }) => {
  await loginPage.gotoSauceDemo();
});

test("Added products appears correctly in cart", async ({
  loginPage,
  page,
  homePage,
  cartPage,
  checkOutPage,
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
    await homePage.addProductToCart(data.text.sauceLabsBackpackText);
    await homePage.addProductToCart(data.text.sauceLabsBikeLightText);
    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe(2);
  });

  await test.step("Click on cart page", async ({}) => {
    await cartPage.gotoCart();
    await expect(page).toHaveURL(`${process.env.BASE_URL}${data.urls.cart}`);
    const itemNames = await cartPage.getAllProductNames();
    expect(itemNames).toEqual([
      data.text.sauceLabsBackpackText,
      data.text.sauceLabsBikeLightText,
    ]);
  });

  await test.step("Verify the remove button from cart", async ({}) => {
    await cartPage.removeProduct(data.text.sauceLabsBackpackText);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);

    const remainingNames = await cartPage.getAllProductNames();
    expect(remainingNames).toEqual([data.text.sauceLabsBikeLightText]);
  });

  await test.step("Checkout the product and user is proceed to checkout page", async ({}) => {
    await cartPage.clickOnCheckOut();
    await checkOutPage.fillInformation(
      data.checkOutData.firstName,
      data.checkOutData.lastName,
      data.checkOutData.zipCode,
    );
    await checkOutPage.continueToOverviewPage();
    await expect(page).toHaveURL(`${process.env.BASE_URL}${data.urls.checkOut}`);
  });

  await test.step("Verify checkout info", async ({}) => {
    const subTotal = await checkOutPage.getSubTotal();
    const tax = await checkOutPage.getTax();
    const total = await checkOutPage.getTotal();

    expect(total).toBeCloseTo(subTotal + tax, 2);
  });

  await test.step("Verify the order page", async ({}) => {
    await checkOutPage.clickFinishButton();
    await expect(page).toHaveURL(`${process.env.BASE_URL}${data.urls.thankYou}`)
    expect(await checkOutPage.getCompleteHeader()).toEqual(data.text.thankYouText)
  });
});
