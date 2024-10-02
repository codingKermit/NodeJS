const fs = require('fs').promises;

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('1번');
})
.catch((err)=>{
    throw err;
})

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('2번');
})
.catch((err)=>{
    throw err;
})

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('3번');
})
.catch((err)=>{
    throw err;
})

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('4번');
})
.catch((err)=>{
    throw err;
})

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('5번');
})
.catch((err)=>{
    throw err;
})