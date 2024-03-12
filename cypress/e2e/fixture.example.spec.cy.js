describe('No site - From fixture to console test', () => {
    beforeEach(function () {// Обязательно использовать function здесь и ниже иначе this. не будет доступен
        // "this" указывает на контекст выполнение теста
        // Извлекаем текст из файла fixtures/another_example.txt
        cy.fixture('another_example').then((text) => {
          // "this" всё ещё в контексте теста
          this.file_text = text
        })
    })

    it('should log data from fixture file', function () {// Тут тоже обязательно использовать function
        // Пишем из объекта через this
        console.log("Text: " + this.file_text);
        // Извлекаем и обрабатываем объект из файла fixtures/example.json
        cy.fixture('example').then(exampleJson => {
            console.log("Name from JSON: " + exampleJson.name);
            console.log("Email from JSON: " + exampleJson.email);
            console.log("Body from JSON: " + exampleJson.body);
        });
    });
});