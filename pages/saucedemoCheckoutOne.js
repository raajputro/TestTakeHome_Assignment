const { expect } = require('@playwright/test');

exports.saucedemoCheckoutOne = class saucedemoCheckoutOne {

    constructor(page) {
        this.page = page;

        this.firstNameBox = page.locator('//*[@id="first-name"]');
        this.lastNameBox = page.locator('//*[@id="last-name"]');
        this.zipCodeBox = page.locator('//*[@id="postal-code"]');

        this.cancelBtn = page.locator('//*[@type="submit"]//parent::div/a');
        this.continueBtn = page.locator('//*[@type="submit"]');        
      }

    async provideCheckoutInfo(firstName, lastName, zipCode){
        var inputElement = this.firstNameBox;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        await inputElement.fill(firstName);

        var inputElement = this.lastNameBox;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        await inputElement.fill(lastName);

        var inputElement = this.zipCodeBox;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        await inputElement.fill(zipCode);
    }

    async goForCheckout(){
        var inputElement = this.continueBtn;
        await expect(inputElement).toBeVisible();
        await inputElement.click();  
    }

}