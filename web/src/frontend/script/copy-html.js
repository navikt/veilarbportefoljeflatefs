const fs = require('fs');

const dest = '../main/webapp/index.html';

let src = 'index.html';
if (process.argv.filter(x => x === '--development')) {
    src = 'index-dev.html';
}

fs.createReadStream(src).pipe(fs.createWriteStream(dest));
