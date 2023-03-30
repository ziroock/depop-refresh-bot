const loginToTremendous = require('./loginToTremendous')

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// require executablePath from puppeteer
const { executablePath } = require('puppeteer')
// const axios = require('axios')

puppeteer.use(StealthPlugin(), executablePath())
const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports = async rewardId => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // Step 1: Make sure we are logged in to Tremendous
  await loginToTremendous(browser)

  // GET request for remote image in node.js
  let rewardDetails = null
  try {
    page.on('response', async response => {
      if (response.url() == `https://testflight.tremendous.com/v1/rewards/${rewardId}/details/`) {
        console.log('TARGETED XHR response received')

        rewardDetails = await response.json()
        console.log('rewardDetails: ', rewardDetails)
      }
    })

    await page.goto(`https://testflight.tremendous.com/v1/rewards/${rewardId}/details/`)
  } catch (e) {
    console.log('Failed to get to login page!')
    console.log(e.message)
  }
  // Instead of simple delay/sleep, do a while lopp that checks if the rewardDetails variable
  // has been set give it a max of 3 seconds to set the variable, if it doesn't set it, then
  // throw an error
  const start = Date.now()
  while (!rewardDetails && Date.now() - start < 3000) {
    console.log('waiting...')
    await delay(500)
  }

  console.log('rewardDetails: ', rewardDetails)

  if (!rewardDetails) {
    throw new Error('Failed to get reward details!')
  }

  return rewardDetails
}

// axios({
//   method: 'GET',
//   url: 'https://testflight.tremendous.com/v1/rewards/2TNWZPIC0TPO/details/',
//   headers: {
//     authority: 'testflight.tremendous.com',
//     accept: 'application/json, text/plain, */*',
//     'accept-language': 'en-US,en;q=0.9',
//     cookie:
//       '_cq_suid=1.1640030112.61nksufC4chR2cs7; messagesUtk=5099b96146e543789c3b76c8c79a604a; _hjSessionUser_2259472=eyJpZCI6ImY1M2NiMmQ5LWI4ODItNWRkNi04MjJhLWJmZmNkNzFjYWRiZCIsImNyZWF0ZWQiOjE2NTUzMjU3NzA3MzAsImV4aXN0aW5nIjp0cnVlfQ==; hubspotutk=ac0c1545e34d42b425a5bf86335ae78d; __hssrc=1; _ga=GA1.1.321357538.1656454230; _cq_duid=1.1656454230.hRjLSVF7VqPAuifJ; _fbp=fb.1.1656454231166.819729296; _delighted_web={%22gwtwiCiy4PVRpysS%22:{%22_delighted_fst%22:{%22t%22:%221656458737488%22}}}; _gr_session_id_v2=49eb2db8f436dc164e0e02fe1e0a3754; sbjs_current=typ%3Dorganic%7C%7C%7Csrc%3Dgoogle%7C%7C%7Cmdm%3Dorganic%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29; _clck=t5pr7k|1|f62|0; sbjs_migrations=1418474375998%3D1; sbjs_first=typ%3Dorganic%7C%7C%7Csrc%3Dgoogle%7C%7C%7Cmdm%3Dorganic%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29; _gcl_au=1.1.1792628862.1672673732; _rtfl_s_unique_visitor_session=X3lUaUNhbGdQMFpkVGxqS2I0R1NYdEtfZGM5YTBhMjM0YmExMmQyMGY3ODFjZDdkYWVjZWIxNmI2NzAzNjVjNg==; _rtfl_s_994358_specific_site_session=X2l4UXhHSm5rQmdNSzFMVjNlTHEwcWxfNTUxN2I0ZTQ5ZDE1MjUzZjlmZGQ0Y2M0NjI2ODMxYTNmNTlhOGNkYQ==; sbjs_udata=vst%3D44%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F111.0.0.0%20Safari%2F537.36; __hstc=190626740.ac0c1545e34d42b425a5bf86335ae78d.1656454228867.1679957761698.1679963251126.66; cf_clearance=Dkz7rTgApgwcYvPTgAt_il5zuLD181YJlYHEQLeYptA-1679964307-0-150; ajs_user_id=9XDCWPXRQW5G; ajs_anonymous_id=6d2939eb-3ce1-4ae2-a53e-25009320cdad; _uetsid=8b7357a0ccf211ed9556cd6dc034953c; _uetvid=bd9c58b061ce11ec8fe21d9facb2d95f; _ga_4QVR4W0SE2=GS1.1.1680021655.112.0.1680021655.60.0.0; fs_uid=#SMTGN#5083944392118272:6589308630978560:::#d7a56274#/1706883230; user_credentials=89e2ed60f7ed0c3f92ce8bfc12939058c65c13bfb7fdf7ff47dace25f6a4252a2cdd11b2abd0a05113555bd34d8c62753109fe9c3b28ac905cb070b8a0b2d9ce%3A%3A108356; _tremendous_session_id=140524b0b9291bc7992332b247857c22; __cf_bm=k7u.SFLg_zjRuUu75jtQ30Txz0SAaUZHndwsG6ce1z8-1680047839-0-AVCTdqDs/RDqvMF3A3DJ7WUzdzv84ghDPZf68J6ALX0T7aQmBs//cZLHkQmzwp8N+nZ+Kre3VAKrqYHl6A4duo4=; datadome=00LaHPGj_eVF-D~ZsoaH2EUCe3~QqOw8bcuvtK0n9x~F~E4ehnaVBrlTjQ~MJXzVAxSbaICF5NiHsKOX_hJlqDWHmQZRlv58ENyF6uf3P7qIBCI9EjvtvuJguPIR-uJ-',
//     origin: 'https://app.testflight.tremendous.com',
//     referer: 'https://app.testflight.tremendous.com/',
//     'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", ";Not A Brand";v="99"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Mac OS X"',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-site',
//     'user-agent':
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
//     'x-timezone': 'America/Los_Angeles',
//   },
// })
//   .then(response => {
//     console.log(response.data)
//   })
//   .catch(error => {
//     console.error(error)
//   })
