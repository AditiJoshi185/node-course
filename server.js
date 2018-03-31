const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    // console.log(`${now}:${req.method} ${req.url}`)
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log',log+'\n',(err)=>{
        if (err){
            console.log("Unable to append")
        }
    })
    next();
})

// app.use((re,res,next)=>{
//     res.render('maintance.hbs') 
// })
app.use(express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear(),
        welcomeMessage:"Welcome Aboard!"
    });
});

app.get('/about',(req,res)=>{
     res.render('about.hbs',{
         pageTitle:'About Page',
         currentYear:new Date().getFullYear()
     });
});


app.listen(3000,()=>{
    console.log("server is running on port 3000")
});
