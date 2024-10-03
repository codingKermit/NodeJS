const fs = require('fs');

fs.writeFile('./deleteme.txt','삭제를 테스트하기 위한 임시 파일입니다.',(err)=>{
    if(err){
        console.error(err);
        throw err;
    }

    // 임시 파일 생성 후 삭제
    fs.rm('./deleteme.txt');
})
