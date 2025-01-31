import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("#user-name");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnLogin() {
    return $("#login-button");
  }

  get errorMessage() {
    return $(".error-message-container.error h3");
  }

  get errorIcons() {
    return $$(".svg-inline--fa.fa-times-circle.fa-w-16.error_icon");
  }

  get loginPageURL() {
    return "https://www.saucedemo.com/";
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open();
  }
}

export default new LoginPage();
