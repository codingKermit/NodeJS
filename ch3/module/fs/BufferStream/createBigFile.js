const fs = require('fs');

const writeStream = fs.createWriteStream('./big.txt');

for(let i = 0; i < 1_000_000;i++){
    writeStream.write('김태희는 바보 멍충이 똥꼬다 히히히 내가 이런거 쓰는지도 모르겠지? 흑백요리사나봐라 히히히/n');
}
writeStream.end();