const { defineConfig } = require('cypress')
const fs = require('fs') // Зависимость файловой системы (file system) - для связывания\отвязывания видео

module.exports = defineConfig({
  projectId: "5a9p29",
  video: true, // Включаем видео (не работает в cypress open!, только в run)
  videoCompression: true, // Добавляем компрессию, чтобы не пожирать память
  //screenshotOnRunFailure: false, // Добавлять ли скриншот при падении теста
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          const version = parseInt(browser.majorVersion)
          if (version >= 112) {
            launchOptions.args.push('--headless=new') // Превентивно решаем проблему с безголовым хромом
          }
        }
    
        return launchOptions
      })
      on('after:spec', (spec, results) => { // Чтобы не хранить видео успешных тестов
        if (results && results.video) {
          // Есть ли у нас зафейленые тесты?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed')
          )
          if (!failures) {
            // Удаляём видео если нет
            fs.unlinkSync(results.video)
          }
        }
      })
    },
    component: {
      specPattern: 'src/path/*.cy.{js,jsx,ts,tsx}' // Указываем паттерн для имён файлов тестов
    },
    //baseUrl: 'https://www.saucedemo.com/', // Наш базовый URL для тестов
    chromeWebSecurity: false, // Избегаем возможных ошибок CORS
    defaultCommandTimeout: 5000 // Глобальный таймаут для действий на страницах
  }
});
