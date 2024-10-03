const fs = require('fs').promises;

fs.watch('./target.txt',(type,name)=>{
    console.log(type,name);
})