const fs = require('fs');

setInterval(() => {
    fs.unlink('./없는파일인데수',(err)=>{
        if(err){
            console.error(err);
        }
    })
}, (1000));