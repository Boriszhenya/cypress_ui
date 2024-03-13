
describe('Sauce Labs Demo - Assertions Test', () => {
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

      // Начинаем проверять всё подряд как только можем =)
      // Should - Cypress wrapper над Chai ассертами
      cy.get('.inventory_list').should('be.visible');
      cy.contains('Products').should('be.visible');
      cy.get('.inventory_item_price').should('contain.text', '$29.99');
      cy.get('#add-to-cart-sauce-labs-backpack').should('have.attr', 'name').and('match', /add-to-cart-sauce-labs-backpack/);// тоже самое что ниже
      cy.get('#add-to-cart-sauce-labs-backpack').should('have.attr', 'name', 'add-to-cart-sauce-labs-backpack');// тоже самое что выше
      cy.get('.inventory_item_desc').should('contain.text', 'carry.allTheThings()');

      // Expect - Chai ассерты
      cy.get('.inventory_item_desc').first().then(($backpack) => {
        expect($backpack).to.be.visible;
        expect($backpack).to.contain.text('carry.allTheThings()');
        expect($backpack).to.have.class('inventory_item_desc');
      });

      // Callback - смесь + рекомендуемый формат для кастомных действий
      cy.get('#add-to-cart-sauce-labs-bike-light').should(($button) => {
        expect($button).to.have.length(1)
        const className = $button[0].className
        // className например ожидаем "btn btn_primary btn_small btn_inventory "
        expect(className).to.match(/btn_inventory/)
      })      
    });
});  