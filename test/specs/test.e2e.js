///     KOROL MARIIA    ///

import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CardPage from "../pageobjects/card.page.js";
import Footer from "../pageobjects/footer.js";
import CheckoutPage from "../pageobjects/checkaut.page.js";

describe("Swag Labs Shop", () => {
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

  it("Sorting", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.productSortContainerOptions[0].click();
    let namesListNew = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );
    let sortedNames = [...namesListNew].sort();
    expect(namesListNew).toEqual(sortedNames);
    await InventoryPage.productSortContainerOptions[1].click();
    let namesListNewZA = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );
    let sortedNamesZA = [...namesListNewZA].sort().reverse();
    expect(namesListNewZA).toEqual(sortedNamesZA);
    await InventoryPage.productSortContainerOptions[2].click();
    let priceListLtoH = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );
    let priceListLtoHFloat = priceListLtoH.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    let sortedPriceList = [...priceListLtoHFloat].sort((a, b) => a - b);
    expect(priceListLtoHFloat).toEqual(sortedPriceList);
    await InventoryPage.productSortContainerOptions[3].click();
    let priceListHtoL = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );
    let priceListHtoLFloat = priceListHtoL.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    let sortedPriceListLtoH = [...priceListHtoLFloat].sort((a, b) => b - a);
    expect(priceListHtoLFloat).toEqual(sortedPriceListLtoH);
  });

  it("Footer Links", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await Footer.socialTwitter.click();
    await Footer.socialFaceBook.click();
    await Footer.socialLinkedin.click();
    const expectedUrls = [
      Footer.twitterPageURL,
      Footer.faceBookPageURL,
      Footer.linkedinPageURL,
    ];
    let handles = await browser.getWindowHandles();
    let actualUrls = [];
    for (let i = 1; i < handles.length; i++) {
      await browser.switchToWindow(handles[i]);
      actualUrls.push(await browser.getUrl());
    }
    for (let expectedFragment of expectedUrls) {
      const isUrlPresent = actualUrls.some((url) =>
        url.includes(expectedFragment)
      );
      expect(isUrlPresent).toBeTruthy();
    }
  });

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
