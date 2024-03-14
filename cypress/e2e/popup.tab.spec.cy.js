describe('automationtesting.in - Pop-ups test', () => {
    beforeEach(() => {
        // Заходим на сайт https://demo.automationtesting.in/ в начале каждого теста
        cy.visit('https://demo.automationtesting.in/Windows.html')
    })

    it('should open popup window, interact with it, and close it', () => {
        // Проверяем что у ссылки есть свойство target - иначе это не pop-up
        cy.get('.active.tab-pane a').should('have.attr', 'target');
        // Нажимаем кнопку чтобы открылось другое окно
        cy.get('.active.tab-pane a').invoke('removeAttr', 'target').click();// Костыль

        // Проверяем что мы перешли куда надо
        cy.url().should('include', 'selenium.dev');

        // Проверяем что в контексте нового окна есть текст
        cy.get('h1.fw-bold').should('contain.text', 'Selenium automates browsers.');
    
        // Делаем дальше свои дела в изначальной странице
        cy.go('back');
        cy.get('.active.tab-pane').should('contain.text', '_blank');
      });
    });