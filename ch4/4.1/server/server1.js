const http = require('http');

http.createServer((req,res)=>{
    res.write('<h1>Hello Node</h1>');
    res.write('<h1>Hello Server</h1>');
    res.end();
})
/** 
 * listen()의 주석 내용을 보니 
 * Server.listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void)
 * 포트번호, 호스트이름, 백로그, 리스너
 * 를 파라미터로 필요로 하고 있음.
 */
.listen(8080,undefined,100,()=>{ 
    console.log('서버가 실행중입니다')
})