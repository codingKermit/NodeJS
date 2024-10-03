const fs = require('fs');

console.log('bafore:',process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./bigCopy.txt');

readStream.pipe(writeStream);

readStream.on('end',()=>{
    console.log('stream:',process.memoryUsage().rss);
    fs.rm('./bigCopy.txt',()=>{
        console.log('end');
    });
})