/**
 * writeFile.js의 코드를 프로미스 기반으로 변경한 예시입니다.
 * 가독성이 비교적 좋아졌습니다.
 * */

const fs = require('fs').promises;

fs.writeFile('./writeme.txt','내용이 입력됩니다')
.then(()=>{
    return fs.readFile('./writeme.txt')
})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
})
.finally(()=>{
    fs.rm('./writeme.txt');
})