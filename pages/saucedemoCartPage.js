const { expect } = require('@playwright/test');

exports.saucedemoCartPage = class saucedemoCartPage {

    constructor(page) {
        this.page = page;
        
        this.cartPageText = page.locator('//*[@id="contents_wrapper"]/div[2]');
        this.checkoutBtn = page.locator('//*[@id="cart_contents_container"]/div/div[2]/a[2]');  
      }

    async checkCartPage(){
        await expect(this.cartPageText).toBeVisible();
    }

    async checkItemAdded(text){
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async checkItemCountMatch(itemCount){
        await expect(this.page.locator('//*[@id="shopping_cart_container"]/a/span')).toHaveText(itemCount.toString());
    }

    async goForCheckout(){
        var inputElement = this.checkoutBtn;
        await expect(inputElement).toBeVisible();
        await inputElement.click(); 
    }

}

//*[@id="shopping_cart_container"]/a/span