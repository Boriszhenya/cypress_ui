import '@cypress/xpath'; // Официально xpath устарел и больше не поддерживается
///<reference types = "Cypress"/>
describe('WebDriver University - Locators test', () => {
    beforeEach(() => {
        // Заходим на сайт http://webdriveruniversity.com/ в начале каждого теста
        cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html')
    })

    it('should be able to find all buttons with CSS', () => {
        
      
      
        cy.window().then(popupWindow => {
            cy.get('#button1 > p').click().screenshot();
             cy.contains('Well done for successfully using the click() method!').should('be.visible');
            cy.get('[data-dismiss="modal"]').first().click().screenshot();
            cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html');
        });
              
            
        cy.window().then(popupWindow => {
            cy.get('#button2').click(); 
            cy.contains('We can use JavaScript code if all else fails! Remember always try to use the WebDriver Library method(s) first such as WebElement.click(). (The Selenium development team have spent allot of time developing WebDriver functions etc).').should('be.visible');
            cy.get('[data-dismiss="modal"]').eq(2).click();
            cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html');
        });

        cy.window().then(popupWindow => {
            cy.get('#button3').click().screenshot(); 
            cy.get('.modal-title').eq(2).contains('Well done! the Action Move & Click can become very useful!').should('be.visible');
            cy.get('[data-dismiss="modal"]').eq(5).click();
            cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html');
        });

        cy.get('#main-header > h1').first().then(($header) => {
            console.log("Text from header: " + $header.text());
        });
    });

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
               cy.get('.close').click();
                // cy.contains('Close').click();
            });
        });

        // Проверяем что окна нет
        cy.get('#myModalClick > .modal-dialog').should('not.be.visible');
    });






    it('should be able to find all buttons with XPATH', () => {
        // Нажимаем кнопку
        cy.xpath('//*[@id="button3"]').click();
        // Проверям сообщение
        cy.contains('Well done! the Action Move & Click can become very useful!').should('be.visible');
        // Закрываем его
        cy.xpath('(//button[.="Close"])[3]').click()
        // И так далее..
        
    });
});
