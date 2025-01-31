import { $ } from "@wdio/globals";
import Page from "./page.js";

class CheckoutPage extends Page {
  get checkoutPageURL() {
    return "https://www.saucedemo.com/checkout-step-two.html";
  }

  get checkoutCompleteURL() {
    return "https://www.saucedemo.com/checkout-complete.html";
  }

  get checkoutItemName() {
    return $(".inventory_item_name");
  }

  get checkoutItemPrice() {
    return $(".inventory_item_price");
  }

  get finishBtn() {
    return $("#finish");
  }

  get message() {
    return $(".complete-header");
  }

  get backHomeBtn() {
    return $("#back-to-products");
  }
}

export default new CheckoutPage();
