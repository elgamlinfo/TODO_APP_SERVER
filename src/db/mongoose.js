const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONNECTION_production,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('mongodb connect successfully :-)');
})