describe('automationtesting.in - Alerts and pop-ups test', () => {
    beforeEach(() => {
        // Заходим на сайт https://demo.automationtesting.in/ в начале каждого теста
        cy.visit('https://demo.automationtesting.in/Alerts.html')
    })

    it('should handle alert text', () => {
      cy.get('button.btn-danger').first().click();
      cy.on('window:alert', (message) => {
        expect(message).to.equal('I am an alert box!');
      });
    });
  });
  