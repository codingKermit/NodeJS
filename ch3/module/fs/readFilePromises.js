const fs = require('fs').promises; // 프로미스를 지원함

fs.readFile('./readme.txt')
.then((data)=>{
    console.log(data);
    console.log(data.toString());
})
.catch((err)=>{
    throw err;
})