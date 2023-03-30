const { loginToDepop } = require('../db-api/depop')
const { takeScreenshot } = require('../db-api/screenshot')
const { getRewardDetails, loginToTremendous, login100Times } = require('../db-api/tremendous')

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/screen-shot', async (req, res) => {
    await takeScreenshot()
    res.send('Taking a screenshot!')
  })

  app.get('/login', async (req, res) => {
    await loginToDepop()
    res.send('Loging in Depop!')
  })

  app.get('/login-t', async (req, res) => {
    await loginToTremendous()
    res.send('Loging in Tremendous!')
  })

  app.get('/tremendous/reward/:id', async (req, res) => {
    const { id } = req.params
    await getRewardDetails(id)
    res.send('Getting Reward!')
  })

  app.get('/tremendous/logIn100Times', async (req, res) => {
    await login100Times()
    res.send('Getting Reward!')
  })
}
