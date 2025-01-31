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
    // User is redirected to the inventory page
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    // Products are displayed
    await expect(await InventoryPage.inventoryItems.length).toBeGreaterThan(0);
    // Cart are displayed
    await expect(InventoryPage.shoppingCartBtn).toExist();
  });

  it("Login with invalid password", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "any-random-value");
    //"X" icons are displayed on the "Login" and "Password" fields
    await expect(await LoginPage.errorIcons.length).toBeGreaterThan(0);

    //this fields are highlighted with red.
    await expect(LoginPage.inputUsername).toHaveClassContaining("input_error");
    await expect(LoginPage.inputPassword).toHaveClassContaining("input_error");
    //error message is visible
    await expect(LoginPage.errorMessage).toExist();
    await expect(LoginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login with invalid login", async () => {
    await LoginPage.open();

    await LoginPage.login("any_other_random_value", "secret_sauce");
    //"X" icons are displayed on the "Login" and "Password" fields
    await expect(await LoginPage.errorIcons.length).toBeGreaterThan(0);

    //this fields are highlighted with red.
    await expect(LoginPage.inputUsername).toHaveClassContaining("input_error");
    await expect(LoginPage.inputPassword).toHaveClassContaining("input_error");
    //error message is visible
    await expect(LoginPage.errorMessage).toExist();
    await expect(LoginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Logout", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.burgerBtn.click();
    //Menu are expanded, 4 items are displayed
    await expect(await InventoryPage.menuItems).toHaveLength(4);

    await InventoryPage.menuItemLogout.click();

    //User are redirecred to the "Login" page
    await expect(browser).toHaveUrl(LoginPage.loginPageURL);

    //"Username" and "Password" field are empty
    await expect(LoginPage.inputUsername).toHaveText("");
    await expect(LoginPage.inputPassword).toHaveText("");
    //await browser.pause(5000);
  });

  it("Saving the card after logout ", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");

    await InventoryPage.addToCardBtn.click();
    // в змінну додаю назву першого елементу по якокому клікали
    let cartName = await InventoryPage.inventoryItemNames[0].getText();

    //Number near the cart at the top right increase by 1, product is added to cart
    await expect(await InventoryPage.shoppingCartBadge).toHaveText("1");

    await InventoryPage.burgerBtn.click();

    //Menu are expanded, 4 items are displayed
    await expect(await InventoryPage.menuItems).toHaveLength(4);

    await InventoryPage.menuItemLogout.click();

    //User are redirecred to the "Login" page
    await expect(browser).toHaveUrl(LoginPage.loginPageURL);

    //"Username" and "Password" field are empty
    await expect(LoginPage.inputUsername).toHaveText("");
    await expect(LoginPage.inputPassword).toHaveText("");

    await LoginPage.login("standard_user", "secret_sauce");
    // User is redirected to the inventory page
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    // Products are displayed
    await expect(await InventoryPage.inventoryItems.length).toBeGreaterThan(0);

    await InventoryPage.shoppingCartBtn.click();

    //Cart page is displayed
    await expect(browser).toHaveUrl(CardPage.cardPageURL);
    // product are the same as was added at step 1
    await expect(cartName).toEqual(await CardPage.inventoryItemName.getText());
    //await browser.pause(5000);
  });

  it("Sorting", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");

    //az
    //
    //
    await InventoryPage.productSortContainerOptions[0].click();
    // сворюємо змінну з всіма назвами товарів
    let namesListNew = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );
    //console.log("Назви всіх товарів:", namesListNew);

    // Копіюємо та сортуємо масив за алфавітом
    let sortedNames = [...namesListNew].sort();

    // Перевіряємо, чи масив відсортований правильно
    expect(namesListNew).toEqual(sortedNames);

    //za
    //
    //
    await InventoryPage.productSortContainerOptions[1].click();
    let namesListNewZA = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );

    // Копіюємо та сортуємо масив у зворотному порядку (Z → A)
    let sortedNamesZA = [...namesListNewZA].sort().reverse();

    // Перевіряємо, чи масив відсортований правильно
    expect(namesListNewZA).toEqual(sortedNamesZA);

    // l o h
    //
    //
    await InventoryPage.productSortContainerOptions[2].click();

    let priceListLtoH = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );

    let priceListLtoHFloat = priceListLtoH.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    //console.log("Ціни всіх товарів:", priceListLtoHFloat);

    // Копіюємо та сортуємо масив для порівняння
    let sortedPriceList = [...priceListLtoHFloat].sort((a, b) => a - b);

    // Перевіряємо, що масив відсортований
    expect(priceListLtoHFloat).toEqual(sortedPriceList);

    // h o l
    //
    //
    await InventoryPage.productSortContainerOptions[3].click();

    let priceListHtoL = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );

    let priceListHtoLFloat = priceListHtoL.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    //console.log("Ціни всіх товарів:", priceListLtoHFloat);

    // Копіюємо та сортуємо масив для порівняння
    let sortedPriceListLtoH = [...priceListHtoLFloat].sort((a, b) => b - a);

    // Перевіряємо, що масив відсортований
    expect(priceListHtoLFloat).toEqual(sortedPriceListLtoH);

    // await browser.pause(3000);
  });

  it("Footer Links", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");

    await Footer.socialTwitter.click();
    await Footer.socialFaceBook.click();
    await Footer.socialLinkedin.click();

    // Оголошуємо очікувані URL
    const expectedUrls = [
      Footer.twitterPageURL,
      Footer.faceBookPageURL,
      Footer.linkedinPageURL,
    ];

    //отримую масив вікон які відрилися
    let handles = await browser.getWindowHandles();
    let actualUrls = [];

    // Отримуємо URL всіх відкритих вкладок
    for (let i = 1; i < handles.length; i++) {
      // Пропускаємо головне вікно (index 0)
      await browser.switchToWindow(handles[i]);
      actualUrls.push(await browser.getUrl());
    }

    // Перевіряємо, чи всі очікувані URL є серед відкритих
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
    //await expect(await InventoryPage.shoppingCartBadge).toHaveText("1"); //коли всі тести додає ще десь 1 товар
    await expect(await InventoryPage.shoppingCartBadge).not.toHaveText("");

    //в змінну додаю назву першого елементу по якокому клікали
    let itemName = await InventoryPage.inventoryItemNames[0].getText();
    //в змінну додаю ціну першого елементу по якокому клікали
    let itemPrice = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );

    let itemPriceFloat = parseFloat(itemPrice[0].replace("$", ""));
    console.log("Raw total price text:1111 ", itemPriceFloat);

    await InventoryPage.shoppingCartBtn.click();
    await expect(browser).toHaveUrl(CardPage.cardPageURL);

    await CardPage.checkoutBtn.click();
    //Checkout form are displayed
    await expect(CardPage.checkoutForm).toExist();

    await CardPage.checkoutFormFirstName.setValue("Mariia");
    await CardPage.checkoutFormLastName.setValue("Korol");
    await CardPage.checkoutFormPostalCode.setValue("136");
    await CardPage.continueBtn.click();

    //User is redirected to the "Overview" page
    await expect(browser).toHaveUrl(CheckoutPage.checkoutPageURL);

    //Products from step 1 is displayed
    await expect(itemName).toEqual(
      await CheckoutPage.checkoutItemName.getText()
    );
    //Total price = price of products from step 1
    let totalPrice = await CheckoutPage.checkoutItemPrice.getText();
    console.log("Raw total price text:", totalPrice);

    let totalPriceFloat = parseFloat(totalPrice.replace("$", ""));
    console.log("Raw total price text2:", totalPriceFloat);

    await expect(itemPriceFloat).toEqual(totalPriceFloat);

    await CheckoutPage.finishBtn.click();

    // message are displayed
    await expect(browser).toHaveUrl(CheckoutPage.checkoutCompleteURL);
    await expect(CheckoutPage.message).toExist();

    await CheckoutPage.backHomeBtn.click();
    //User is redirected to the inventory page
    await expect(browser).toHaveUrl(InventoryPage.inventoryPageURL);
    //Products are displayed
    const items = await InventoryPage.inventoryItems;
    for (let item of items) {
      await expect(item).toExist();
    }

    //Cart is empty
    await InventoryPage.shoppingCartBtn.click();
    await expect(CardPage.cartItem).not.toExist();
  });
});
