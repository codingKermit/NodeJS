const fs = require('fs');

console.log('before:',process.memoryUsage().rss);

const data = fs.readFileSync('./big.txt');
fs.writeFileSync('./bigCopy.txt',data);

console.log('after:',process.memoryUsage().rss);

fs.rmSync('./bigCopy.txt')