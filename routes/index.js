const { screenshot, loginToDepop } = require('../utils')

module.exports = app => {
  app.get('/screen-shot', async (req, res) => {
    await screenshot()
    res.send('Hello World!')
  })
  app.get('/login', async (req, res) => {
    await loginToDepop()
    res.send('Hello World!')
  })
}
