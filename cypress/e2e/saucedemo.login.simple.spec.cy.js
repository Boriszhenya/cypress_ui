describe('Sauce Labs Demo - Simple Login Test', () => {
  beforeEach(() => {
    // Заходим на Sauce Labs demo сайт в начале каждого теста
    //cy.visit('/') // Если у нас установлен baseUrl в конфиге
    cy.visit('https://www.saucedemo.com/')
  })

  it('should login with valid credentials', () => {
    // Вводим имя пользователя и пароль
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');

    // Нажимаем кнопку логина
    cy.get('#login-button').click();

    // Проверяем что вход удался опираясь на URL
    cy.url().should('include', '/inventory.html');

    // Можно сделать дополнительные ассерты для проверки главной страницы
    // Например:
    // cy.get('.inventory_list').should('be.visible');
    // cy.contains('Products').should('be.visible');
  });

  it('should display an error message for invalid credentials', () => {
    // Вводим неверные имя пользователя и пароль
    cy.get('#user-name').type('invalid_user');
    cy.get('#password').type('invalid_password');

    // Нажимаем кнопку логина
    cy.get('#login-button').click();

    // Проверяем что сообщение об ошибке отображается
    cy.get('.error-message-container').should('be.visible');
    cy.contains('Epic sadface: Username and password do not match any user in this service')
      .should('be.visible');
  });
});
