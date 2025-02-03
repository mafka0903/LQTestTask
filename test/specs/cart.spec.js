import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CardPage from "../pageobjects/card.page.js";

describe("Card tests", () => {
  it("Saving the card after logout ", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.addToCardBtn.click();
    let cartName = await InventoryPage.inventoryItemNames[0].getText();
    await expect(await InventoryPage.shoppingCartBadge).toHaveText("1");
    await InventoryPage.burgerBtn.click();
    await expect(await InventoryPage.menuItems).toHaveLength(4);
    await InventoryPage.menuItemLogout.click();
    await expect(browser).toHaveUrl(LoginPage.loginPageURL);
    await expect(LoginPage.inputUsername).toHaveText("");
    await expect(LoginPage.inputPassword).toHaveText("");
    await LoginPage.login("standard_user", "secret_sauce");
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    await expect(await InventoryPage.inventoryItems.length).toBeGreaterThan(0);
    await InventoryPage.shoppingCartBtn.click();
    await expect(browser).toHaveUrl(CardPage.cardPageURL);
    await expect(cartName).toEqual(await CardPage.inventoryItemName.getText());
  });
});
