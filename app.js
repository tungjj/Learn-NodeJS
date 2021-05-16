const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require('./mongoose')
const user_route = require('./routes/user')
const port = process.env.PORT || 3000


app.use(express.json());
app.use('/user', user_route)

app.get('/', (req, res)=>{res.send('hello')})


app.listen(port, () =>
{
    console.log('Server is up on port'+port)
})