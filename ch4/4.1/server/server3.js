const http = require('http');
const fs = require('fs').promises;

const server = http.createServer( async (req,res)=>{
    try {
        res.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        const data = await fs.readFile('./server.html');
        res.end(data);
    } catch (error) {
        console.error(error);
        res.writeHead(200,{'Content-type':'text/plain; charset=utf-8'});
        res.end(error.message);
    }
});

/**
 * server1.js 파일과는 다른 방식으로 서버를 구동시켜보았습니다
*/
server.listen(8080);

server.on('listening',()=>{
    console.log('8080 포트에서 대기 중')
});

server.on('error',(err)=>{
    console.error(err);
})