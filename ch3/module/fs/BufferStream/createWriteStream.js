const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme.txt');

writeStream.on('finish',()=>{
    console.log('파일 쓰기 종료');
})

writeStream.on('error',(err)=>{
    console.error(err);
})

writeStream.write('첫 번째 줄 내용입니다\n');
writeStream.write('두 번째 줄 내용입니다\n');
writeStream.write('세 번째 줄 내용입니다\n');
writeStream.end();