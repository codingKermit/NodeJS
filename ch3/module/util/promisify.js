const util = require('util');
const crypto = require('crypto');

const randomBytePromise = util.promisify(crypto.randomBytes);
randomBytePromise(64)
.then((buf)=>{
    console.log(buf.toString('base64'));
})
.catch((err)=>{
    console.error(err);
})