'use strict';   
var encryptor = require('file-encryptor');
var path = require("path");


var option = { algorithm : 'aes256' };
function encrypt(input,output,key,cb) {
    try{
        console.log("in the try block");
        var filename=path.basename(input);
        var ext=path.extname(filename);
        console.log("filename",ext);
        
        if(ext==".mp4"&&key!=""){
        
            encryptor.encryptFile(input, output, key,option, function(err) {  
             if(err){
                console.log("in err");
                var response={
                    status:false,
                    output:output
                }
                cb && cb(response)
             } else{
                console.log("in else")
                var response={
                    status:true,
                    output:output
                }
                cb && cb(response);
              }

            });
         
    
        }

    else{
		 console.log("else block of format checker");
		 var response={
			 status:false,
			 message:"in valid format"
		 }
		 cb && cb(response)

    }
    }catch(e){

        console.log(" in the catch block")
        var response={
            status:false,
        };
        cb && cb(response);
    }
    
    
 }



//=================================================

function decrypt(input,output,key,cb) {
	try{
		 console.log("in the try block");
		 var filename=path.basename(input);
		 var ext=path.extname(filename);
		 console.log("filename",ext);
		 
		 if(ext==".mp4"&&key!=""){
		 
			  encryptor.decryptFile(input, output, key,option, function(err) {  
				if(err){
					console.log("in err");
					var response={
						 status:false,
						 output:output
					}
					cb && cb(response.status)
				} else{
					console.log("in else")
					var response={
						 status:true,
						 output:output
					}
					cb && cb(response);
				 }

			  });
		  
	
		 }

	else{
		console.log("else block of format checker");
		var response={
			status:false,
			message:"in valid format"
		}
		cb && cb(response)

	}
	}catch(e){

		 console.log(" in the catch block")
		 var response={
			  status:false,
		 };
		 cb && cb(response);
	}
	
	
}



// function decrypt(input,output,key,cb) {
//     encryptor.decryptFile(input, output, key,option, function(err) {
//         return output;      
//     });
// }

 module.exports={encrypt,decrypt};

