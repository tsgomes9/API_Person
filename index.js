require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

//Atribuir à DB_USER e DB_PASSWORD usuário e senha do mongoDB no arquivo .env.example
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//rotas
const personRoutes = require('./routes/personRoute')

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// )

//midleware
app.use(express.json())

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

//conexão com banco / entrega da porta 3000

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dmcxopa.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3000)
    console.log('MongoDB Connect Success...')
  })
  .catch((error) => console.log(error))
