/**
 * writeFileSync 를 사용하여 동기적으로 파일을 생성하는 예시입니다. 
 */

const fs = require('fs');

fs.writeFileSync('./writeme.txt','내용으로 사용될 인수 입니다');

const data = fs.readFileSync('./writeme.txt');

console.log(data.toString());

fs.rmSync('./writeme.txt');