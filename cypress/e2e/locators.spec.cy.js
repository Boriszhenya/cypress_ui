import '@cypress/xpath'; // Официально xpath устарел и больше не поддерживается

describe('WebDriver University - Locators test', () => {
    beforeEach(() => {
        // Заходим на сайт http://webdriveruniversity.com/ в начале каждого теста
        cy.visit('http://webdriveruniversity.com/Click-Buttons/index.html')
    })

    it('should be able to find all buttons with CSS', () => {
        // Нажимаем кнопку
        cy.get('#button1 > p').click();
        // Проверям сообщение
        cy.contains('Well done for successfully using the click() method!').should('be.visible');
        // Закрываем его
        cy.get('[data-dismiss="modal"]').first().click()
        // И так далее...
        cy.get('#main-header > h1').first().then(($header) => {
            console.log("Text from header: " + $header.text());
        });
    });

    it('should be able to find all buttons with XPATH', () => {
        // Нажимаем кнопку
        cy.xpath('//*[@id="button3"]').click();
        // Проверям сообщение
        cy.contains('Well done! the Action Move & Click can become very useful!').should('be.visible');
        // Закрываем его
        cy.xpath('(//button[.="Close"])[3]').click()
        // И так далее...
    });
});