const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456'; // 32바이트
const iv = "abcdefghijklmnop"; // 16 바이트 
// key와 iv의 길이는 algorithm에 따라 달라짐.

const cipher = crypto.createCipheriv(algorithm,key,iv);
let result = cipher.update('비밀번호','utf8','base64');
result += cipher.final('base64');
console.log('암호화 : ', result);

const decipher = crypto.createDecipheriv(algorithm,key,iv);
let result2 = decipher.update(result,'base64','utf8');
result2 += decipher.final('utf8');
console.log('복호화 : ',result2);