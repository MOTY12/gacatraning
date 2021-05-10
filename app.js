const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const json2xls = require('json2xls')
const cors = require('cors') 
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const apis = process.env.API_URL

//app midlleware
app.use(cors())
app.use(json2xls.middleware)
app.options('*', cors())
app.use(bodyparser.json())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

//import routes
const trainingRoutes = require('./routes/training')
const fieldRoutes = require('./routes/fields')
const inputRoutes = require('./routes/input')
const categoryRoutes = require('./routes/category')
const blogRoutes = require('./routes/blog')
const tagRoutes = require('./routes/tag')
const commentRoutes = require('./routes/comment')

//route middleware
app.use(`${apis}`, trainingRoutes)
app.use(`${apis}`, fieldRoutes)
app.use(`${apis}`, inputRoutes)
app.use(`${apis}`, categoryRoutes)
app.use(`${apis}`, blogRoutes)
app.use(`${apis}`, tagRoutes)
app.use(`${apis}`, commentRoutes)



 //configuring the database
 mongoose.connect(process.env.DBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log('connected to the database')}).catch((err)=>{
    console.log('not connect to db')
})

app.listen(3000, ()=>console.log('Server up and running on port http://localhost:3000'))