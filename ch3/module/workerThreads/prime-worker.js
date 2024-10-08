 const { isMainThread, Worker, parentPort, workerData} = require('worker_threads')

const min = 2;
let primes = [];

function findPrimes(start,range){
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++){
        for(let j = min; j < Math.sqrt(end);j++){
            if(i !== j && i % j === 0){
                isPrime = false;
                break;
            }
        }

        if(isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

if(isMainThread){
    const max = 10_000_000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max-min)/threadCount);
    let start = min;
    console.time('primes');
    for(let i = 0; i < threadCount - 1; i++){
        const wStart = start;
        threads.add(new Worker(__filename,{workerData:{start : wStart, range, index:i}}));
        start += range;
    }

    threads.add(new Worker(__filename,{workerData: {start, range : range+((max-min+1)%threadCount),index:7}}))

    for(let worker of threads){
        worker.on('error',(err)=>{
            throw err;
        })

        worker.on('exit',()=>{
            threads.delete(worker);
            if(threads.size === 0){
                console.timeEnd('primes');
                console.log(primes.length);
            }
        })

        worker.on('message',(msg)=>{
            primes = primes.concat(msg);
        })
    }
} else {
    console.log('start:',workerData.start,',range:',workerData.range,',index:',workerData.index);
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}