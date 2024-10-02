const fs = require('fs');

const data1 = fs.readFileSync('./readme.txt');
console.log('1번',data1.toString());

const data2 = fs.readFileSync('./readme.txt');
console.log('2번',data2.toString());

const data3 = fs.readFileSync('./readme.txt');
console.log('3번',data3.toString());

const data4 = fs.readFileSync('./readme.txt');
console.log('4번',data4.toString());

const data5 = fs.readFileSync('./readme.txt');
console.log('5번',data5.toString());