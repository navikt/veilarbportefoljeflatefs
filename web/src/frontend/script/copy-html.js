const fs = require('fs');

const dest = '../main/webapp/index.html';

let src = 'index.html';
if (process.env.NODE_ENV === 'development') {
    src = 'index-dev.html';
}

fs.createReadStream(src).pipe(fs.createWriteStream(dest));
