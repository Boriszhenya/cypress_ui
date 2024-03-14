describe('WebDriver University - Modal Test', () => {
        beforeEach(() => {
            // Заходим на сайт http://webdriveruniversity.com/ в начале каждого теста
            cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html')
        })
  
        it('should open modal, assert text, and close modal', () => {
            // Нажимаем кнопку чтобы открыть модальное окно
            cy.get('#button1').click();
        
            // Ждём что оно отображается
            cy.get('#myModalClick > .modal-dialog').should('be.visible');
        
            // Переключаемся в него
            cy.get('#myModalClick > .modal-dialog').within(() => {
                // Проверяем что у него есть текст
                cy.contains('Well done for successfully using the click() method!')
                    .should('be.visible');
        
                // Внутри его контента ищем кнопку и закрываем
                cy.get('.modal-content').within(() => {
                    //cy.get('.close').click(); // Нажимаем крестик
                    cy.contains('Close').click(); // Нажимаем кнопку Close
                });
            });
    
            // Проверяем что окна нет
            cy.get('#myModalClick > .modal-dialog').should('not.be.visible');
        });
  });
  