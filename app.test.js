import { expect, assert } from 'chai';
import path from 'path';
var encrypter=require('./app1.js')


describe('Encrypter/Decrypter', function () {

    it('encrypt should return true status with valid filetype ', (done) => {
        var input=path.resolve(__dirname+'/xyz.mp4')
        var output=path.resolve(__dirname+'/pqr.mp4');
        var key="abc";
        encrypter.encrypt(input,output,key,(response) => {
            console.log("response",response.status);
            assert.equal(true,response.status);
            done();
            })
         })
    

    it('encrypt should return false status with Invalid filetype', (done) => {
        var input=path.resolve(__dirname+'/abc.mp3');
        var output="323";
        var key="3232";
        encrypter.encrypt(input,output,key,(response) => {
            console.log("response2",response);
            assert.equal(false,response.status)
            done();
        })

    });
    it('encrypt should return false status with empty key  ', (done) => {
        var input=path.resolve(__dirname+'/xyz.mp4')
        var output=path.resolve(__dirname+'/pqr.mp4');
        var key=null;
        encrypter.encrypt(input,output,key,(response) => {
            console.log("response",response.status);
            assert.equal(false,response.status)
            done();
            })
         })

    it('encrypt should return false status with unselected file', (done) => {
        var input=null;
        var output="323";
        var key="3232";
        encrypter.encrypt(input,output,key,(response) => {
            console.log("response2",response);
            assert.equal(false,response.status)
            done();
        })

    });

    //==========================================================================
    it('decrypt should return true status with valid filetype(encrypted file) and valid key ', (done) => {
        var input=path.resolve(__dirname+'/jellyfish.mp4')
        var output=path.resolve(__dirname+'/pqr.mp4');
        var key="123";
        encrypter.decrypt(input,output,key,(response) => {
            console.log("response",response.status);
            assert.equal(true,response.status)
            done();
            })
         })

    it('decrypt should return true status with valid filetype(encrypted file) and Invalid key ', (done) => {
                                        var input=path.resolve(__dirname+'/jellyfish.mp4')
                                        var output=path.resolve(__dirname+'/pqr.mp4');
                                        var key="321";
                                        encrypter.decrypt(input,output,key,(response) => {
                                            console.log("response",response);
                                            assert.equal(false,response)
                                            done();
                                            })
                                        })
    

    it('decrypt should return false status with Invalid filetype', (done) => {
        var input=path.resolve(__dirname+'/abc.mp3');
        var output="323";
        var key="3232";
        encrypter.decrypt(input,output,key,(response) => {
            console.log("response2",response);
            assert.equal(false,response.status)
            done();
        })

    });
    it('decrypt should return false status with empty key  ', (done) => {
        var input=path.resolve(__dirname+'/xyz.mp4')
        var output=path.resolve(__dirname+'/pqr.mp4');
        var key=null;
        encrypter.decrypt(input,output,key,(response) => {
            console.log("response",response.status);
            assert.equal(false,response.status)
            done();
            })
         })

    it('decrypt should return false status with unselected file', (done) => {
        var input=null;
        var output="323";
        var key="3232";
        encrypter.decrypt(input,output,key,(response) => {
            console.log("response2",response);
            assert.equal(false,response.status)
            done();
        })

    });

});