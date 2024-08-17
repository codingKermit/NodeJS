/*
1. 구조분해 할당은 변수명과 가져오는 값이 동일
2. 하나만 exports 한 경우 변수명이 상이해도 무관
*/
const {odd, even} = require('./var');
const checkNum = require('./func');

function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkNum(10));
console.log(checkStringOddOrEven('Good bye!'));