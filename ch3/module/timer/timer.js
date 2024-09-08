const timeOut = setTimeout(()=>{
    console.log('1.5 초 후 실행')
},1500)

const interval = setInterval(()=>{
    console.log('1초 마다 실행')
},1000)

const timeOut2 = setTimeout(()=>{
    console.log('실행 안됨')
},3000)

setTimeout(()=>{
    clearTimeout(timeOut2);
    clearInterval(interval);
},2500)

const immediate = setImmediate(()=>{
    console.log('즉시 실행');
});