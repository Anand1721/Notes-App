const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const noteRouter = require('./routers/noteRouter')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(noteRouter)

app.get('*', (req, res) => {
    res.send("<h1>Notes App</H1><br>Cannot GET!")
})

app.listen(port, () => {
    console.log("Server is up on port:", port)
})