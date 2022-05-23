const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//const authRoutes = require('./routes/auth')
const toDoRoutes = require('./routes/todo')

const app = express()
const port = 5000

const databaseUrl = process.env.DATABASE_URL || ''//'mongodb+srv://********************.byoka.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(databaseUrl)
    .then(()=>console.log("MongoDB connected succesfuly"))
    .catch(error => console.log(error))
    
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())

//app.use('/api/auth',authRoutes)
app.use('/todo',toDoRoutes)


app.listen(port,()=>console.log(`The Server is running on PORT ${port}...`))
