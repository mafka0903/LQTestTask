import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

describe("Authorization and logout tests", () => {
  it("Valid Login", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    await expect(await InventoryPage.inventoryItems.length).toBeGreaterThan(0);
    await expect(InventoryPage.shoppingCartBtn).toExist();
  });

  it("Login with invalid password", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "any-random-value");
    await expect(await LoginPage.errorIcons.length).toBeGreaterThan(0);
    await expect(LoginPage.inputUsername).toHaveClassContaining("input_error");
    await expect(LoginPage.inputPassword).toHaveClassContaining("input_error");
    await expect(LoginPage.errorMessage).toExist();
    await expect(LoginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login with invalid login", async () => {
    await LoginPage.open();
    await LoginPage.login("any_other_random_value", "secret_sauce");
    await expect(await LoginPage.errorIcons.length).toBeGreaterThan(0);
    await expect(LoginPage.inputUsername).toHaveClassContaining("input_error");
    await expect(LoginPage.inputPassword).toHaveClassContaining("input_error");
    await expect(LoginPage.errorMessage).toExist();
    await expect(LoginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Logout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.burgerBtn.click();
    await expect(await InventoryPage.menuItems).toHaveLength(4);
    await InventoryPage.menuItemLogout.click();
    await expect(browser).toHaveUrl(LoginPage.loginPageURL);
    await expect(LoginPage.inputUsername).toHaveText("");
    await expect(LoginPage.inputPassword).toHaveText("");
  });
});
