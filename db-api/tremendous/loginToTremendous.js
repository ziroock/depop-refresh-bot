const fs = require('fs').promises
const delay = ms => new Promise(res => setTimeout(res, ms))

const username = 'test_username'
const password = 'test_password'

module.exports = async browser => {
  const page = await browser.newPage()

  let cookies = []
  const cookiesPath = './json-files/cookies.json'

  try {
    console.log('Loading cookies...')
    //load cookies
    const cookiesString = await fs.readFile(cookiesPath)
    cookies = JSON.parse(cookiesString)
    await page.setCookie(...cookies)

    // Step 1: Go to url
    await page.goto('https://app.testflight.tremendous.com')

    if (page.url() === 'https://app.testflight.tremendous.com/auth/login') {
      console.log('Cookies are expired, login again...')
      // Step 1: Go to url
      await page.goto('https://app.testflight.tremendous.com/auth/login')

      // Step 2: Login
      await delay(3000)
      await page.type('#email', username)
      await delay(3000)
      await page.type('#password', password)
      await delay(3000)
      await Promise.all([page.waitForNavigation(), page.click(`[type="submit"]`)])

      // Step 3: Get cookies
      cookies = await page.cookies()
      console.log('cookies: ', cookies)

      // Step 4: Save cookies to file to be used in other profile pages
      await fs.writeFile(cookiesPath, JSON.stringify(cookies, null, 2))
    }
  } catch (e) {
    console.log('Failed to login!')
    console.log(e.message)
  }

  return cookies
}
