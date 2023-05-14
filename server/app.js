if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/index');
const { errorHandler } = require('./middleware/errorHandler');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)


module.exports = app