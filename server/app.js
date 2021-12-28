const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({path : './config.env'});
require('./db/connection');

app.use(express.json());

 const User = require('./models/userSchema');
app.use(cookieParser(process.env.SECRET_KEY));

app.use(require('./router/auth'));
app.use(require('./router/users'));
app.use(require('./router/posts'));

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`s${PORT}`);
});