const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('난 없는거에요');
}, 1000);