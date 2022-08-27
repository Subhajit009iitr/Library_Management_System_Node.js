const express = require('express');// imports expres modules
 
const sessions = require("express-session");

require('dotenv').config();
const db = require('./data');
const { constants } = require('buffer');  //imports buffer module

const { nextTick } = require('process');

const path = require('path');  //imports path module

const app=express();

db.connect();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images')));  //adds path to external folder('images' in this case)
const PORT = process.env.PORT || 5000;   //either uses given port or 5000

const router = express.Router();

app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));  //helps connect to port

app.use('/',router);

router.get('/',(req,res)=>{
    console.log('At Homepage!'); //console.log() not necessary but useful to check function calls
    res.render('index')
});

router.get('/adminLogin',(req,res)=>{
    console.log('Admin Login Page Activated!');
    res.render('adminLogin')
});

router.get('/clientLogin',(req,res)=>{
    console.log('Client Login Page Activated!');
    //res.send('finally got it😁')
    res.render('clientLogin')
});

router.get('/adminRegister',(req,res)=>{
    console.log('Admin Register Page Activated!');
    res.render('adminRegister')
});

router.get('/clientRegister',(req,res)=>{
    console.log('Client Register Page Activated!');
    res.render('clientRegister')
});

router.post("/loginClient",(req,res)=>{
    let name=req.body.uname;
    let pwd=req.body.pwd;
    //let salti=meow;
    //let saltl=bhau;
    //let crypto=require('crypto');
    //let newpd=salti+pwd+saltl;
    //const hash=crypto.createHash('sha256').update(newpd).digest('base64');
    console.log("1st phase working fine");
    console.log("SELECT * FROM client WHERE Username="+db.escape(name)+";")
    db.query(`SELECT * FROM client WHERE Username=${db.escape(name)};`,(error,result,field) => {
        console.log('hmm got entry inside db query');
    if (error || result[0] === undefined) {
        console.log("No Data sorry!");
        return res.send('USER NOT REGISTERED.');
    }
    else{
        //if(result[0] !== undefined && result[0].Password == hash){
            console.log(result);
            res.send("Oh yeah Successful!!!");
        //}
    }
    });
    console.log("Reached the end")
});