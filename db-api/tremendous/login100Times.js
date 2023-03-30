// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// require executablePath from puppeteer
const { executablePath } = require('puppeteer')
// const axios = require('axios')
const fs = require('fs')
const Promise = require('bluebird')

puppeteer.use(StealthPlugin(), executablePath())
const delay = ms => new Promise(res => setTimeout(res, ms))

const username = 'test_username'
const password = 'test_password'

module.exports = async () => {
  const d0 = new Date()
  let cookies = []
  //   const iterations = [...Array(100).keys()]
  //   console.log('iterations: ', iterations)
  console.log('Why am i here (>_<)')
  for (let i = 0; i < 25; i++) {
    const d1 = new Date()
    console.log('(>_<) Logging in cookies... ', i)
    const cookie = await loginToTremendous()
    // cookies.push(cookie)
    fs.readFile('./json-files/100cookies.json', async function readFileCallback(err, data) {
      if (err) {
        console.log(err)
      } else {
        if (data && data.length > 0) {
          data = JSON.parse(data) //now it an object
          if (cookie && cookie.length > 0) {
            data = [...data, cookie] //add some data
          }
        } else {
          data = [cookie]
        }

        // console.log('data: ', data)
        console.log('data length: ', data.length)
        console.log('Writing data to file...')
        fs.writeFile('./json-files/100cookies.json', JSON.stringify(data, null, 2), function (err) {
          if (err) {
            throw err
          }
        }) // write it back
      }
    })
    console.log('Cookies: ', cookies.length, ' Time: ', (new Date() - d1) / 1000, 's')
    console.log('Time so far: ', (new Date() - d0) / 1000, 's')
    await delay(3000)

    // console.log('Cookies: ', cookies)
    // console.log('Cookies length: ', cookies.length)
  }
  //   await fs.writeFile('./100cookies.json', JSON.stringify(cookies, null, 2))
  console.log('Total time: ', (new Date() - d0) / 1000, 's')
}

const loginToTremendous = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  let cookies = null
  try {
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
    // console.log('cookies: ', cookies)
    await browser.close()
  } catch (e) {
    console.log('Failed to login!')
    console.log(e.message)
  }

  if (!cookies || cookies.length === 0) {
    console.log('BAAAAD COOOKIE')
  }

  return cookies
}
