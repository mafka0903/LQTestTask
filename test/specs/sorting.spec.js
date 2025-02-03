import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

describe("Sorting tests", () => {
  it("Sorting by name (A to Z)", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.productSortContainerOptions[0].click();
    let namesListNew = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );
    let sortedNames = [...namesListNew].sort();
    expect(namesListNew).toEqual(sortedNames);
  });

  it("Sorting by name (Z to A)", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.productSortContainerOptions[1].click();
    let namesListNewZA = await InventoryPage.inventoryItemNamesNew.map((el) =>
      el.getText()
    );
    let sortedNamesZA = [...namesListNewZA].sort().reverse();
    expect(namesListNewZA).toEqual(sortedNamesZA);
  });

  it("Sorting by price (low to high) ", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.productSortContainerOptions[2].click();
    let priceListLtoH = await InventoryPage.inventoryItemPrice.map((el) =>
      el.getText()
    );
    let priceListLtoHFloat = priceListLtoH.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    let sortedPriceList = [...priceListLtoHFloat].sort((a, b) => a - b);
    expect(priceListLtoHFloat).toEqual(sortedPriceList);
  });

  it("Sorting by price (high to low)", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
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
});
