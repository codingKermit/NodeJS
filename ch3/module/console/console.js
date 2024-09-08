const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside : {
            key:'value'
        }
    }
}
console.time('전체 시간');
console.log('평범한 로그. 쉼표로 구분해서 여러 값 출력 가능');
console.log(string,number,boolean); // 값 사이는 공백으로 구분됨.
console.error('에러 메세지는 console.error 으로 사용');

console.table([{이름:'코난',나이:"기억이 안남 사실",성별:'남성'},{이름:'김전일',나이:"고등학생...이었음",성별:'남성'}]);

console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:2});  // 값 부분을 컬러로 강조해줌 키-값 구분이 쉬워서 좋음
console.dir(obj, {colors:false, depth:1});
console.dir(obj, {colors:true, depth:1});

console.time('시간 측정');
for (let i = 0 ; i < 1000000; i++) {}
console.timeEnd('시간 측정');

function b(){
    console.trace('에러 위치 추적');
}

function a(){
    b();
}
a();