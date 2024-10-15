const { test, expect } = require('@playwright/test');
const { saucedemoLoginPage } = require('../pages/saucedemoLoginPage');
const { saucedemoInventoryPage } = require('../pages/saucedemoInventoryPage');
const { saucedemoCartPage } = require('../pages/saucedemoCartPage');
const { saucedemoCheckoutOne } = require('../pages/saucedemoCheckoutOne');
const { saucedemoCheckoutTwo } = require('../pages/saucedemoCheckoutTwo');

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
  await browser.close();
}); 

var itemName1 = "Sauce Labs Backpack";
var itemName2 = "Sauce Labs Fleece Jacket";

test('Login to SauceDemo', async () => {
  const saucedemoLoginPg = new saucedemoLoginPage(page);
  const saucedemoInventoryPg = new saucedemoInventoryPage(page);
  
  await saucedemoLoginPg.goto();
  await saucedemoLoginPg.fillUserName('standard_user');
  await saucedemoLoginPg.fillPassWord('secret_sauce');
  await saucedemoLoginPg.pressLogin();

  // Checking if the login is successfull
  await saucedemoInventoryPg.productTextVisible();  
});

test('Add item 1 to Cart', async () => {
  const saucedemoInventoryPg = new saucedemoInventoryPage(page);

  await saucedemoInventoryPg.itemVisible(itemName1);
  await saucedemoInventoryPg.addItem(itemName1);    
});

test('Add item 2 to Cart', async () => {
  const saucedemoInventoryPg = new saucedemoInventoryPage(page);

  await saucedemoInventoryPg.itemVisible(itemName2);
  await saucedemoInventoryPg.addItem(itemName2);    
});

test('Go to Cart', async()=>{
  const saucedemoInventoryPg = new saucedemoInventoryPage(page);
  await saucedemoInventoryPg.goToCart();
  await expect(page).toHaveURL(/.*cart/);
});

test('Check 2 Items were added', async()=>{
  const saucedemoCartPg = new saucedemoCartPage(page);
  await saucedemoCartPg.checkItemAdded(itemName2);
  await saucedemoCartPg.checkItemAdded(itemName1);
  await saucedemoCartPg.checkItemCountMatch(2);  
});

test('Go for Checkout', async()=>{
  const saucedemoCartPg = new saucedemoCartPage(page);
  await saucedemoCartPg.goForCheckout();  
})

test('Provide Checkout Information and Complete Checkout', async()=>{
  const saucedemoCheckout1 = new saucedemoCheckoutOne(page);
  await saucedemoCheckout1.provideCheckoutInfo('abcd', 'efgh', '1234');
  await saucedemoCheckout1.goForCheckout();
});

test('Verify and Complete Order', async()=>{
  const saucedemoCheckout2 = new saucedemoCheckoutTwo(page);
  await saucedemoCheckout2.checkOverview();
  await saucedemoCheckout2.goForFinish();
});