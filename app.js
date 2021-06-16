const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require('./mongoose')
const user_route = require('./routes/user')
const port = process.env.PORT || 3000
const socket = require('socket.io')

app.use(express.json());
app.use('/user', user_route)

// use static
app.use(express.static("public"));


// socket
const server = app.listen(port, () =>
{
    console.log('Server is up on port'+port)
})
const io = socket(server)
io.on('connection', (socket) => {
    console.log("Made a connection")
})