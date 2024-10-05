const express = require('express'); // 익스프레스 모듈을 require하여 받습니다.
const path = require('path'); // 경로 관리를 위한 모듈 path 도 받습니다.


const app = express(); // express application을 생성합니다.

app.set('port',process.env.PORT | 3000); // 포트를 설정합니다

app.get('/',(req,res)=>{ // GET 방식의 / 에 대한 응답을 설정합니다.

	/**
	 * html 파일을 제공할 경우 sendFile() 을 사용합니다.
	 * 이 때 내부적으로는 fs 모듈의 기능을 사용합니다.
	*/
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',(req,res)=>{
    res.send('hello express');
})

app.get('/about',(req,res)=>{
    res.send('hello express');
})

app.listen(3000,()=>{
    console.log('익스프레스 서버 대기중')
})