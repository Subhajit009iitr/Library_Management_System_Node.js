const express = require('express');// imports expres modules
 
const sessions = require("express-session");

require('dotenv').config(); //connects to .env file to fetch sensitive data

const db = require('./data');
const { constants } = require('buffer');  //imports buffer module

const { nextTick } = require('process');

const path = require('path');  //imports path module

const crypto=require('crypto');

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
    //res.send('finally got it😁') //To Check whether connections are working and page is ready for rendering
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
    let uname=req.body.uname;
    let pwd=req.body.pwd;
    db.query(`SELECT * FROM users WHERE name=${db.escape(uname)} and role='client';`,(error,result,field) => {
        let newpd=pwd+result[0].salt;
        const hash=crypto.createHash('sha256').update(newpd).digest('base64');
    if (error || result[0] === undefined) {
        res.send('USER NOT REGISTERED.');
    }
    else{
        if(result[0] !== undefined && result[0].hash == hash){
            //res.send("Oh yeah Successful!!!");
            res.render('clientPage')
        }
        else{
            res.send("Wrong Password!!!");
        }
    }
    });
});

router.post("/loginAdmin",(req,res)=>{
    let uname=req.body.uname;
    let pwd=req.body.pwd;
    db.query(`SELECT * FROM users WHERE name=${db.escape(uname)} and role='admin';`,(error,result,field) => {
        let newpd=pwd+result[0].salt;
        const adhash=crypto.createHash('sha256').update(newpd).digest('base64');
    if (error || result[0] === undefined) {
        res.send('USER NOT REGISTERED.');
    }
    else{
        if(result[0] !== undefined && result[0].hash == adhash){
            //res.send("Oh yeah Successful!!!");
            res.render('adminPage');
        }
        else{
            res.send("Wrong Password!!!");
        }
    }
    });
});

function makeSalt(length){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i=0;i<length;i++){
      result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
   return result;
}

router.post("/clRegister",(req,res)=>{
    let uname=req.body.uname;
    let pass=req.body.pwd;
    let conpass=req.body.conpwd;
    db.query(`SELECT * FROM users WHERE name=${db.escape(uname)} AND role='client;'`,(error,result,field) =>{
        if(result[0]==undefined&&pass === conpass){
            if(pass.length>4){
                let Salt=makeSalt(8);
                let newpass=pass+Salt;
                const crhash=crypto.createHash('sha256').update(newpass).digest('base64');
                db.query(`INSERT INTO users(name,hash,salt,role) VALUES('${uname}','${crhash}','${Salt}','client');`);
                db.query(`SELECT * FROM users WHERE name=${db.escape(uname)} AND role='client;'`,(error,result,field) =>{
                    if(error){
                        res.send("Some error occured please try again!!!");
                    }
                    else{ 
                        console.log('Successfully Registered!!!---Now Login');
                        res.render('clientLogin');
                    }
                });
            }
            else{
                res.send("Minimum Password length is 4- Please Retry!!!");
            }
        }
        else{
            res.send("UserName alreday exists!! TRY SOMETHING ELSE !!");
        }

    });
});