/**
 * 콜백 기반의 writeFile을 사용한 예시입니다.
 * 짧지만 콜백 지옥의 징조가 보입니다.
 */

const fs = require('fs')

fs.writeFile('./writeme.txt','내용이 입력됩니다',(err)=>{
    if(err){
        throw err;
    }
    fs.readFile('./writeme.txt',(err,data)=>{
        if(err){
            throw err;
        }
        console.log(data.toString());
    })
    // 일일이 삭제하기 번거로우니 삭제하는 코드를 포함
    fs.rm('./writeme.txt',(err)=>{
        if(err){
            throw err;
        }
    })
})
