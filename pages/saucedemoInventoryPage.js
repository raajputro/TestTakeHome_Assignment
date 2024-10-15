const { expect } = require('@playwright/test');

var cartCount = 0;

exports.saucedemoInventoryPage = class saucedemoInventoryPage {
    
    constructor(page) {
      this.page = page;
      this.productsText = page.locator('//div[@class="product_label"]');
       // first item locator
      var firstItemXpath = '//*[@class="inventory_item_label"]/a[@href="./inventory-item.html?id=0"]';
      this.firstInventoryItem = page.locator('//*[@class="inventory_item_label"]/a[@href="./inventory-item.html?id=0"]/div[@class="inventory_item_name"]');
      this.firstInventoryItemAddButton = page.locator(firstItemXpath + '//parent::div//following-sibling::div[@class="pricebar"]/button');       

      this.goToCartLink = page.locator('//*[@id="shopping_cart_container"]');
      this.cartItemCount = page.locator('//*[@id="shopping_cart_container"]/a/span');

      this.addedItemName = '';
    }

    async productTextVisible(){
        await expect(this.productsText).toBeVisible();
    }

    async itemVisible(){        
        await expect(this.firstInventoryItem).toBeVisible();
    }

    async itemVisible(itemName){        
        var itemElemXpath = '//div[normalize-space()="'+itemName+'"]';
        var elem = this.page.locator(itemElemXpath);
        await expect(elem).toBeVisible();
    }

    async addItem(itemName){
        var itemElemXpath = '//div[normalize-space()="'+itemName+'"]';
        var itemElemAddCartXpath = itemElemXpath + '//parent::a//parent::div//parent::div//child::div[@class="pricebar"]/div//following-sibling::button';

        var elem = this.page.locator(itemElemXpath);
        await expect(elem).toBeVisible();

        elem = this.page.locator(itemElemAddCartXpath);
        await expect(elem).toBeVisible();
        await elem.click();
        
        cartCount++;

        var cartCountElem = this.cartItemCount;
        await expect(cartCountElem).toBeVisible();                 
        await expect(cartCountElem).toHaveText(cartCount.toString());        
    }

    async goToCart(){
        var inputElement = this.goToCartLink;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
    }
  };
