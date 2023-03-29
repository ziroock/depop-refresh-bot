// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports.loginToDepop = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  try {
    //Step 1: Go to depop
    await page.goto('https://www.depop.com/login/')
    //Step 2: Open cookie settings
    await delay(3000)
    await page.click(`[data-testid="cookieBanner__manageCookiesButton"]`)
    page.waitForNavigation()
    //Step 3: Accept all cookie settings
    await delay(3000)
    await page.click(`[data-testid="cookieModal__acceptButton"]`)
    page.waitForNavigation()
  } catch (e) {
    console.log('Failed to get to login page!')
    console.log(e.message)
    throw new Error('Failed to get to the login page!')
  }

  const username = 'zppy'
  const password = 'ILikePizza123!@#'
  // Login
  await delay(3000)
  await page.type('#username', username)
  await delay(3000)
  await page.type('#password', password)
  await delay(3000)
  await Promise.all([page.waitForNavigation(), page.click(`[data-testid="login__cta"]`)])

  // Get cookies
  const cookies = await page.cookies()
  console.log('cookies: ', cookies)
  // Use cookies in another tab or browser
  const page2 = await browser.newPage()
  await page2.setCookie(...cookies)
  // Open the page as a logged-in user
  await page2.goto('https://www.depop.com/')

  //   const el2 = document.querySelector('[data-id]')
  //   console.log(el2) // 👉️ div
  //   await page.screenshot({ path: 'example.png' })

  //   await browser.close()
}
