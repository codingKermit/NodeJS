const fs = require('fs');

fs.readFile('./readme.txt',(err,data)=>{
    if(err){
        throw err;
    }

    console.log(data); // 바이너리 데이터로 출력됨
    console.log(data.toString());
})