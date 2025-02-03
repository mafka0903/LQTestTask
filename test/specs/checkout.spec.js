///     KOROL MARIIA    ///

import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CardPage from "../pageobjects/card.page.js";
import CheckoutPage from "../pageobjects/checkaut.page.js";

describe("Checkout tests", () => {
  it("Valid Checkout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.addToCardBtn.click();
    await expect(await InventoryPage.shoppingCartBadge).not.toHaveText("");
    let itemName = await InventoryPage.inventoryItemNames[0].getText();
    let itemPrice = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );
    let itemPriceFloat = parseFloat(itemPrice[0].replace("$", ""));
    console.log("Raw total price text:1111 ", itemPriceFloat);
    await InventoryPage.shoppingCartBtn.click();
    await expect(browser).toHaveUrl(CardPage.cardPageURL);
    await CardPage.checkoutBtn.click();
    await expect(CardPage.checkoutForm).toExist();
    await CardPage.checkoutFormFirstName.setValue("Mariia");
    await CardPage.checkoutFormLastName.setValue("Korol");
    await CardPage.checkoutFormPostalCode.setValue("136");
    await CardPage.continueBtn.click();
    await expect(browser).toHaveUrl(CheckoutPage.checkoutPageURL);
    await expect(itemName).toEqual(
      await CheckoutPage.checkoutItemName.getText()
    );
    let totalPrice = await CheckoutPage.checkoutItemPrice.getText();
    console.log("Raw total price text:", totalPrice);
    let totalPriceFloat = parseFloat(totalPrice.replace("$", ""));
    console.log("Raw total price text2:", totalPriceFloat);
    await expect(itemPriceFloat).toEqual(totalPriceFloat);
    await CheckoutPage.finishBtn.click();
    await expect(browser).toHaveUrl(CheckoutPage.checkoutCompleteURL);
    await expect(CheckoutPage.message).toExist();
    await CheckoutPage.backHomeBtn.click();
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    const items = await InventoryPage.inventoryItems;
    for (let item of items) {
      await expect(item).toExist();
    }
    await InventoryPage.shoppingCartBtn.click();
    await expect(CardPage.cartItem).not.toExist();
  });
});
