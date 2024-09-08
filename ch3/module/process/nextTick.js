setImmediate(()=>{
    console.log('즉시 실행')
})

process.nextTick(()=>{
    console.log('새치기 해버리기!')
})

setTimeout(()=>{
    console.log('타임 아웃!')
},0)

Promise.resolve().then(()=>{console.log('프로미스임')})
