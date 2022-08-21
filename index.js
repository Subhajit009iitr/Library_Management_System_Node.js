//res.render res.send router app express_modules how_to connect_to_database console_printing_of_console.log() db.escape .env

const express = require('express');

const cookieParser = require('cookie-parser');
const sessions = require("express-session");

const d = new Date();
const db = require('./data');
const { constants } = require('buffer');

const { nextTick } = require('process');

const res = require('express/lib/response');
const req = require('express/lib/request');

const path = require('path');//imports path module

const app=express();
const oneDay = 1000*60*60;

db.connect();

app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images')));//adds path to external folder('images' in this case)
const PORT = process.env.PORT || 5000; //either uses given port or 5000

const router = express.Router();

app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));

app.use('/',router);

router.get('/',(req,res)=>{
    res.render('index')
});

router.get('/adminLogin',(req,res)=>{
    res.render('adminLogin')
});

router.get('/clientLogin',(req,res)=>{
    console.log('Hello');
    //res.send('finally got it')
    res.render('clientLogin')
});

router.get('/adminRegister',(req,res)=>{
    res.render('adminRegister')
});

router.get('/clientRegister',(req,res)=>{
    res.render('clientRegister')
});

router.post('/loginClient',(req,res)=>{
    let name=req.body.uname;
    let pwd=req.body.pwd;
    let salti=meow;
    let saltl=bhau;
    let crypto=require('crypto');
    let newpd=salti+pwd+saltl;
    const hash=crypto.createHash('sha256').update(newpd).digest('base64');
    if (error || result[0] === undefined) {
        return res.send('USER NOT REGISTERED.');
    }

});