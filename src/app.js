const express = require("express");
const { set } = require("express/lib/response");
const app = express()

const checkAuth = require('./middleware/checkAuth');

//setting the port
app.set ('port', process.env.PORT || 3000);

//middleware
app.use(express.json())

//routes
app.use('/api/document', checkAuth, require('./routes/document.route'))
app.use('/api/user', require('./routes/user.route'))
app.use('/api/record', checkAuth, require('./routes/record.route'))


module.exports = app