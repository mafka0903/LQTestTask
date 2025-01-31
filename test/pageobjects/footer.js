import { $ } from "@wdio/globals";
import Page from "./page.js";

class Footer extends Page {
  get twitterPageURL() {
    return "x.com";
  }

  get faceBookPageURL() {
    return "facebook.com";
  }

  get linkedinPageURL() {
    return "linkedin.com";
  }

  get socialTwitter() {
    return $(".social_twitter");
  }

  get socialFaceBook() {
    return $(".social_facebook");
  }

  get socialLinkedin() {
    return $(".social_linkedin");
  }
}

export default new Footer();
