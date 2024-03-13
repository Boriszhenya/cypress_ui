class LoginPage {
    // Определяем локаторы
    get usernameInput() {
      //return cy.get('#user-name');
      return cy.get('[data-test="username"]');
    }
  
    get passwordInput() {
      return cy.get('#password');
    }
  
    get loginButton() {
      return cy.get('#login-button');
    }
  
    // Определяем методы взаимодействия с элементами
    fillUsername(username) {
      this.usernameInput.type(username);
    }
  
    fillPassword(password) {
      this.passwordInput.type(password);
    }
  
    clickLoginButton() {
      this.loginButton.click();
    }
  
    // Определяем метод для ввода учётных данных
    login(username, password) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.clickLoginButton();
    }
  
    // Определяем метод для получения текста ошибки
    getErrorMessage() {
      return cy.get('[data-test="error"]').invoke('text');
    }
  }
  
  // “Выносим” страницу как импортируемый объект
  export default new LoginPage();