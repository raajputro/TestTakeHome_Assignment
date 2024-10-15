const { expect } = require('@playwright/test');

exports.saucedemoCheckoutTwo = class saucedemoCheckoutTwo {

    constructor(page) {
        this.page = page;
        
        this.cancelBtn = page.locator('//*[contains(text(),"CANCEL")]');
        this.continueBtn = page.locator('//*[contains(text(),"FINISH")]');

    }

    async checkOverview(){
        await expect(this.page).toHaveURL(/.*checkout-step-two/);
    }

    async goForFinish(){
        var inputElement = this.continueBtn;
        await expect(inputElement).toBeVisible();
        await inputElement.click(); 

        await expect(this.page).toHaveURL(/.*checkout-complete/);
    }
    
}