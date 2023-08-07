const mongoose = require('mongoose');
require('dotenv').config();

let url = process.env.DATABASE_URL;

exports.dbConnect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {console.log("DB connection successful !!")})
    .catch((err) => {
        console.error(err);
        console.log("Error in connecting to DB !!");
        process.exit(1);
    })
}