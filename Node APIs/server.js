const express = require('express')
require('./config')
const mongoose=require('mongoose')
const cors = require('cors');
const session=require('express-session')
const app = express()
require('dotenv').config();
const router=require('./Routes/userRoute.js')
app.use(cors());
app.use(session({secret: 'Your_Secret_Key', resave: true, saveUninitialized: true}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))
app.use('/home',router);
app.get('/', (req, res) => {
  res.send('Hello User!')
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})