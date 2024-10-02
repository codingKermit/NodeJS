/*
asyncOrder.js, asyncOrderPromise.js 의 코드를 async/await 방식으로 바꾼 예제입니다.
앞선 두 예시보다 훨씬 가독성이 좋아졌습니다.
readFileSync() 를 썻을 때와 꽤 비슷한 모양을 가집니다
*/

const fs = require('fs').promises;

const main = async() => { // CommonJS라서 바로 await 할 수 없기 때문에 async 함수를 생성합니다
    const data1 = await fs.readFile('./readme.txt');
    console.log('1번',data1.toString());
    const data2 = await fs.readFile('./readme.txt');
    console.log('2번',data2.toString());
    const data3 = await fs.readFile('./readme.txt');
    console.log('3번',data3.toString());
    const data4 = await fs.readFile('./readme.txt');
    console.log('4번',data4.toString());
    const data5 = await fs.readFile('./readme.txt');
    console.log('5번',data5.toString());
}

main();