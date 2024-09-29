const {execFile} = require('child_process');

const process = execFile('python',['test.py']);

 process.stdout.on('data',(data)=>{
    console.log(data);
 })

 process.stderr.on('data',(data)=>{
    console.error(data);
 })