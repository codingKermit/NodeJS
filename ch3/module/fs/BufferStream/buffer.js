const buffer = Buffer.from('아임 버퍼에요');
console.log('from():',buffer);
console.log('length:',buffer.length);
console.log('toString():',buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5));