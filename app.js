

var express = require("express");
var multer=require('multer');
var bodyParser=require('body-parser');
var app = express();
var encryptor = require('file-encryptor');
var path = require("path");
var encrypter=require('./app1.js')

app.set('view engine','ejs');
app.set('views','./views');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  

var currentfileName;

//========================================
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        console.log("file name",file.originalname);
        currentfileName=file.originalname;
      cb(null, file.originalname);
     // console.log("kaka",file.__dirname);
    }
  })


  var upload = multer({ storage: storage })


//=============================================

  var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/my-uploadstwo');
      console.log("herre");
    },
    filename: function (req, file, cb) {
        currentfileName=file.originalname;
        console.log("file name2",currentfileName);
        
      cb(null, file.originalname);
     // console.log("kaka",file.__dirname);
    }
  })


  var upload2 = multer({ storage: storage2 })


//===============================================

// var upload = multer({
//     dest:'files/' });


app.get('/',function(req,res){
    res.render('home');
});

app.use("/encrypt",upload.single('video'),function(req,res,next){
    console.log("in middleware");
   // encrypter.encrypt("reqfile",'output',key);
    next();
})

app.post("/encrypt",function(req,res,next){
  //  console.log( "type of",typeof req.file);
  
    var key=req.body.key;
    
    console.log("key",req.body.key);
    
    
    var reqfile=path.resolve(__dirname+`/tmp/my-uploads/${currentfileName}`);
    console.log("reqfile",reqfile);
    var output=path.resolve(__dirname+`/tmp/encrypted/${currentfileName}`);
    console.log("swdsd",encrypter.encrypt(reqfile,output,key));

    res.end("Encrypted successfully");
    
    

});

app.use("/decrypt",upload2.single('video'),function(req,res,next){
    console.log("in middleware");
   // encrypter.encrypt("reqfile",'output',key);
    next();
})

app.post("/decrypt",function(req,res){       
    var key=req.body.key;
    console.log("key",key);
    var reqfile=path.resolve(__dirname+`/tmp/my-uploadstwo/${currentfileName}`);
    console.log("req file",reqfile);
    var output = path.resolve(__dirname+`/tmp/decrypted/${currentfileName}`);
    console.log("outputfile",output);
    encrypter.decrypt(reqfile,output,key)
    //res.end("decrypted successfully");


});

app.listen(3000);

console.log('Application Started now ');