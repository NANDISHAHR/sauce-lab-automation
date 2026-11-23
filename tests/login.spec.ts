import { expect } from "@playwright/test";
import { test } from "../fixtures/pom-fixtures";
import {testdata} from "../testdata/account";
import {data} from '../testdata/constant'

test.beforeEach("Open sauce demo web application", async ({ loginPage }) => {
  await loginPage.gotoSauceDemo();
});

test("User can login with valid credentials @smoke", async ({
  loginPage,
  page,
  homePage
}) => {
  await loginPage.doLogin(testdata.standardUser.username, testdata.standardUser.password);

  await expect(page).toHaveURL(`${process.env.BASE_URL}${data.urls.inventory}`);
  expect(await page.title()).toBe(data.text.title);
  await expect(homePage.headingText).toHaveText(data.text.productTitle)
});
