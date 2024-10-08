const fs = require('fs');
const readStream = fs.createReadStream('./readme.txt',{highWaterMark:16} );
const data = [];

readStream.on('data',(chunk)=>{
    data.push(chunk);
    console.log(chunk);
    console.log(chunk.length);
    console.log(chunk.toString());
})

readStream.on('end',()=>{
    console.log('end:',Buffer.concat(data).toString());
})

readStream.on('error',(err)=>{
    console.error(err);
});