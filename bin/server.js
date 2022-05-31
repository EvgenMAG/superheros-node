const db = require('../src/db')
const app = require('../src/app')

require('dotenv').config()

const PORT = process.env.PORT || 3600

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((e) => { console.log(`Server not running ${e.message}`) }
)
