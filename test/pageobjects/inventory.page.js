import { $ } from "@wdio/globals";
import Page from "./page.js";

class InventoryPage extends Page {
  get inventoryPageURL() {
    return "https://www.saucedemo.com/inventory.html";
  }

  get inventoryItems() {
    return $$(".inventory_item");
  }

  get shoppingCartBadge() {
    return $(".shopping_cart_badge");
  }

  get burgerBtn() {
    return $("#menu_button_container .bm-burger-button");
  }

  get menuItems() {
    return $$(".bm-item.menu-item");
  }

  get menuItemLogout() {
    return $("#logout_sidebar_link");
  }

  get addToCardBtn() {
    return $(".btn.btn_primary.btn_small.btn_inventory");
  }

  get shoppingCartBtn() {
    return $(".shopping_cart_link");
  }
  get inventoryItemNamesNew() {
    return $$(".inventory_item_name");
  }

  get inventoryItemNames() {
    return $$(".inventory_item .inventory_item_name");
  }

  get productSortContainer() {
    return $(".product_sort_container");
  }

  get productSortContainerOptions() {
    return $$(".product_sort_container option");
  }

  get inventoryItemPrice() {
    return $$(".inventory_item_price");
  }
}

export default new InventoryPage();
