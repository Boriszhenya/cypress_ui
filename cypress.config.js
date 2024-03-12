const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
    },
    component: {
      specPattern: 'src/path/*.cy.{js,jsx,ts,tsx}' // Указываем паттерн для имён файлов тестов
    },
    //baseUrl: 'https://www.saucedemo.com/', // Наш базовый URL для тестов
    chromeWebSecurity: false, // Избегаем возможных ошибок CORS
    defaultCommandTimeout: 5000 // Глобальный таймаут для действий на страницах
  }
});
