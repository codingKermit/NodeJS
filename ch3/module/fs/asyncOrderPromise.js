/*
asyncOrder.js 의 코드를 프로미스 방식으로 바꾼 예제입니다.
가독성이 비교적 좋아졌습니다. 
*/
const fs = require('fs').promises;

fs.readFile('./readme.txt')
.then((data)=>{
    console.log('1번',data.toString());
    return fs.readFile('./readme.txt');
})
.then((data)=>{
    console.log('2번',data.toString());
    return fs.readFile('./readme.txt');
})
.then((data)=>{
    console.log('3번',data.toString());
    return fs.readFile('./readme.txt');
})
.then((data)=>{
    console.log('4번',data.toString());
    return fs.readFile('./readme.txt');
})
.then((data)=>{
    console.log('5번',data.toString());
    return fs.readFile('./readme.txt');
})
.catch((err)=>{
    throw err;
})