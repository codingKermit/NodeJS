const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.write('<h1>Hello Server</h1>');
    res.end();
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