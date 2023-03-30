const express = require('express')
const app = express()
app.use(express.json())

require('./api')(app)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
