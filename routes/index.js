const { screenshot, loginToDepop } = require('../utils')
const { getRewardDetails, loginToTremendous } = require('../db-api/tremendous')

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/screen-shot', async (req, res) => {
    await screenshot()
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
}
