const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder',constants.F_OK | constants.W_OK | constants.R_OK)
.then(()=>{
    return Promise.reject('이미 있음');
})
.catch((err)=>{
    if(err.code === 'ENOENT'){ // 파일 또는 디렉토리가 존재하지 않을 때 발생하는 에러 코드
        console.log('폴더 없음');
        return fs.mkdir('./folder');
    }
    return Promise.reject(err);
})
.then(()=>{
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js','w');
})
.then((fd)=>{
    console.log('빈 폴더 만들기 성공',fd);
    fs.rename('./folder/file.js','./folder/newFile.js');
})
.then(()=>{
    console.log('이름 바꾸기 성공');
})
.catch((err)=>{
    console.error(err);
})