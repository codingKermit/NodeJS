const fs = require('fs');

fs.writeFileSync('./deleteme.txt','삭제를 테스트하기 위한 임시 파일입니다.');

fs.rmSync('./deleteme.txt');