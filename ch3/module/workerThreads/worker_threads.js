const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread){
    const threads = new Set();

    for(let i = 0; i < 2;i++){
        threads.add(new Worker(__filename,{
            workerData:{start : (i+1)},
        }));
    }

    // const worker = new Worker(__filename); // 다른 파일의 파일 경로를 사용하는 것도 가능
    // worker.postMessage('ping');
    
    for(const worker of threads){
        worker.on('message',(value)=>{
            console.log('자식이 보낸', value);
        })
        worker.on('exit',()=>{
            console.log('워커 종료됨');
            threads.delete(worker);
            if(threads.size == 0){
                console.log('워커 작업 전체 끝')
            }
        })

    }
} else {
    // parentPort.on('message',(value)=>{
    //     console.log('부모가 보낸',value);
    //     parentPort.postMessage('pong');
    //     parentPort.close();
    // })
    const data = workerData;
    parentPort.postMessage(data.start * 100);
}