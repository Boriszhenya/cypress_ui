describe('Sauce Labs Demo - Screenshots Test', () => {
    beforeEach(() => {
      // Заходим на Sauce Labs demo сайт в начале каждого теста
      //cy.visit('/') // Если у нас установлен baseUrl в конфиге
      cy.visit('https://www.saucedemo.com/')
    })
  
    it('should login with valid credentials', () => {
        /// tag: smoke
      // Вводим имя пользователя и пароль
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
  
      // Нажимаем кнопку логина
      cy.get('#login-button').click();
  
      // Проверяем что вход удался опираясь на URL
      cy.url().should('include', '/inventory.html');
  
      // Делаем скриншот страницы
      cy.screenshot();
      // Делаем обрезанный скришнот страницы
      // screenshot будет обрезан на 20 пикселей сверху и слева
      // до размера 400px x 300px
      cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } });
      // Делаем скриншот элемента
      cy.get('#item_5_title_link').parent().parent().screenshot();
    });
});