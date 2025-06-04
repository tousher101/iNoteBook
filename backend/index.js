require("dotenv").config();
const cors = require('cors')
const connectToMongo = require('./db')
const passport=require('passport');require('./utils/passport')
//const cookieParser = require('cookie-parser')

connectToMongo();


const express = require('express')
const app = express()

const port=process.env.PORT || 5000;
//app.use(cookieParser()) // cockie based token system
app.use(cors())
app.use(passport.initialize())
app.use (express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/auth', require ('./routes/auth'));
app.use('/api/notes', require ('./routes/notes'));
app.use('/api/photos', require('./routes/photoUpload'));
app.use('/api/socialauth', require('./routes/social-Auth'));
app.use('/api/tasks', require('./routes/tasks'))

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})