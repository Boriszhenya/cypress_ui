import LoginPage from '../pages/loginpage';

describe('Sauce Labs Demo - POM Login Page Test', () => {
  beforeEach(() => {
    // Переходим на сайт
    cy.visit('https://www.saucedemo.com/');
  });

  it('should display error message for invalid login', () => {
    // Попытка входа с невалидными данными
    LoginPage.login('invalidusername', 'invalidpassword');

    // Проверка сообщения об ошибке
    LoginPage.getErrorMessage().should('contain', 'Username and password do not match any user in this service');
  });

  it('should navigate to inventory page for valid login', () => {
    // Вход с валидными данными
    LoginPage.login('standard_user', 'secret_sauce');

    // Проверка что мы на главной странице
    cy.url().should('include', '/inventory.html');
  });
});
