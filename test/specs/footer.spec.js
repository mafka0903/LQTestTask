import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";

import Footer from "../pageobjects/footer.js";

describe("Swag Labs Shop", () => {
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
});
