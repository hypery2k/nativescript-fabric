import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
import { isSauceLab, runType } from "nativescript-dev-appium/lib/parser";
import { expect } from "chai";
import "mocha";

const isSauceRun = isSauceLab;
const isAndroid: boolean = runType.includes("android");


// CONFIG CONSTANTS
const OVERALL_TIMEOUT = 800000;
const WAIT_TIMEOUT = 100000;

describe("sample scenario", async function () {
  const defaultWaitTime = 5000;
  let driver: AppiumDriver;

  before(async () => {
    driver = await createDriver();
  });

  after(async () => {
    if (isSauceRun) {
      driver.sessionId().then(function (sessionId) {
        console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
      });
    }
    await driver.quit();
    console.log("Quit driver!");
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await driver.logScreenshot(this.currentTest.title);
    }
  });

  it("should find an element", function () {
    return driver
      .findElementByAccessibilityId('tapButton', WAIT_TIMEOUT)
      .should.exist;
    /*  .tap()
    .waitForElementByAccessibilityId('appURL', WAIT_TIMEOUT)
     .elementByAccessibilityId("appURL")
     .should.eventually.exist; */
  });
});
