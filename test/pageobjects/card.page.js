import { $ } from "@wdio/globals";
import Page from "./page.js";

class CardPage extends Page {
  get cardPageURL() {
    return "https://www.saucedemo.com/cart.html";
  }
  get inventoryItemName() {
    return $(".inventory_item_name");
  }

  get checkoutBtn() {
    return $("#checkout");
  }

  get checkoutForm() {
    return $(".checkout_info");
  }

  get checkoutFormFirstName() {
    return $("#first-name");
  }

  get checkoutFormLastName() {
    return $("#last-name");
  }

  get checkoutFormPostalCode() {
    return $("#postal-code");
  }

  get continueBtn() {
    return $("#continue");
  }

  get cartItem() {
    return $(".cart_item");
  }
}

export default new CardPage();
