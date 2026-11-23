import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/cartPage";
import { CheckOutPage } from "../pages/CheckOutPage";

type PomTypeFixtures = {
  loginPage: LoginPage;
  homePage: HomePage
  cartPage: CartPage
  checkOutPage: CheckOutPage
};

export const test = baseTest.extend<PomTypeFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async({page}, use) => {
    await use(new HomePage(page))
  },
  cartPage: async({page}, use) => {
    await use(new CartPage(page))
  },
  checkOutPage: async({page}, use) => {
    await use(new CheckOutPage(page))
  }
});
