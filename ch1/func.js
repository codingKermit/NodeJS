/* 
1. '.js' 확장자 생략 가능
2. 구조분해 할당 문법
*/
const {odd, even} = require('./var');

function checkOddOrEven(number){
    if(number%2){
        return odd;
    } else {
        return even;
    }
}

module.exports= checkOddOrEven;