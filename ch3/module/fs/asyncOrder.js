/*
fs의 작업을 콜백으로 순서대로 작업하기 위한 예제.
콜백 기반인 fs 모듈 그대로를 사용했기 때문에 콜백 지옥이 됩니다.
*/

const fs = require('fs');

fs.readFile('./readme.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('1번',data.toString());
    fs.readFile('./readme.txt',(err,data)=>{
        if(err){
            throw err;
        }
        console.log('2번',data.toString());
        fs.readFile('./readme.txt',(err,data)=>{
            if(err){
                throw err;
            }
            console.log('3번',data.toString());
            fs.readFile('./readme.txt',(err,data)=>{
                if(err){
                    throw err;
                }
                console.log('4번',data.toString());
            })
        })
    })
})


