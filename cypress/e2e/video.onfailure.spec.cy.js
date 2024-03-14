describe('Sauce Labs Demo - Video on failure Test', () => {
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
  
      // Переходим на страницу продукта
      cy.get('#item_5_title_link').click();

      // Проверяем что переход удался опираясь на URL
      cy.url().should('include', '/inventory-item.html?id=5');

      // Этот ассерт упадёт, потому что текст другой
      cy.get('.inventory_details_desc').should('contain.text', 'It\'s every day');
    });
});