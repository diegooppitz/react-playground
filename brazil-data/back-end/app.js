const express = require('express')

const Routes = require('./routes/index.js')

const cors = require('cors')

const app = express()

app.use(cors())

app.use('/', Routes)


app.listen(3000, () => {
  console.log(`server is running.`);
});