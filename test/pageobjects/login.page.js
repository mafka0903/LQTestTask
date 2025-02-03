import { $ } from "@wdio/globals";
import Page from "./page.js";

class LoginPage extends Page {
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

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  open() {
    return super.open();
  }
}

export default new LoginPage();
