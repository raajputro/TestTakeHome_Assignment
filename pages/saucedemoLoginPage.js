const { expect } = require('@playwright/test');

exports.saucedemoLoginPage = class saucedemoLoginPage {
    
    constructor(page) {
      this.page = page;
      this.acceptedUserNames = page.locator('h4', { hasText: 'Accepted usernames are:' });
      
      this.userNameInput = page.locator('[data-test="username"]');
      this.passWordInput = page.locator('[data-test="password"]');
      this.loginButton = page.getByRole('button', { name: 'LOGIN' });    
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/v1/');
    }
  
    async getStarted() {
      await expect(this.acceptedUserNames).toBeVisible();      
    }

    async fillUserName(userName) {
        var inputElement = this.userNameInput;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        await inputElement.fill(userName);      
    }

    async fillPassWord(password){
        var inputElement = this.passWordInput;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        await inputElement.fill(password);
    }

    async pressLogin(){
        var inputElement = this.loginButton;
        await expect(inputElement).toBeVisible();
        await inputElement.click();
        
    }  

}