const mongoose = require('mongoose');
const DB = process.env.DATABASE;

// mongoose.connect(DB,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(()=>{
//     console.log('connected');
// }).catch((err)=>console.log(err));

mongoose.connect(DB,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });