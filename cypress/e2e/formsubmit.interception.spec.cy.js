describe('Ultimate QA - Form Submission Interception test', () => {
    beforeEach(() => {
        // Заходим на сайт https://ultimateqa.com/ в начале каждого теста
        cy.visit('https://ultimateqa.com/')
    })

    it('should handle unexpected server error during form submission', () => {
      // Перехват отправки формы и “насильное” падение с 500-ой ошибкой
      cy.intercept('POST', '/filling-out-forms/', {
        statusCode: 500,
        body: { error: 'ETO NE NASTOJASCAYA OSHIBKA!' },
        delayMs: 1000 // Симулируем задержку ответа
      }).as('formSubmission');
  
      // Переходим на страницу с формой
      cy.visit('https://ultimateqa.com/filling-out-forms/');
  
      // Заполняем форму валидными данными
      cy.get('[data-original_id="name"]').first().type('John Doe');
      cy.get('[data-original_id="message"]').first().type('Message I want to share, but no luck it\'ll be 500 error =(');
      // И отправляем её
      cy.get('button[type="submit"]').first().click();
  
      // Ждём выполнения запроса
      cy.wait('@formSubmission');
  
      // Проверяем что ответ совпадает с ожидаемым для 500-ой ошибки
      cy.get('[data-form_unique_num="0"]').should('have.attr', 'style').and('match', /opacity: 0.2/);
      // Если бы там была обработка ошибок - мы бы её увидели
      // cy.contains('An unexpected error occurred while submitting the form').should('be.visible');
    });
  });
  