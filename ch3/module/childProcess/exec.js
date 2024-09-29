const {exec} = require('child_process');

const process = exec('cmd /c chcp 65001>nul && dir');

 process.stdout.on('data',(data)=>{
    console.log(data);
 })

 process.stderr.on('data',(data)=>{
    console.error(data);
 })