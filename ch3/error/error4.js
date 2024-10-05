process.on('uncaughtException',(err)=>{
    console.error('예상치 못한 에러',err);
})

setInterval(() => {
    throw new Error('서버 대폭팔!');
}, 1000);

setTimeout(() => {
    console.log('실행이 됩니다');
}, 2000);