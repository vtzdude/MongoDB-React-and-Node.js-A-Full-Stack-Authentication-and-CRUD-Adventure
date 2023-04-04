const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.URL)
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })