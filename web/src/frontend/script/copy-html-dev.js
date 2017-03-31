const fs = require('fs');

const dest = '../main/webapp/index.html';

/* eslint-disable no-var*/
var src = 'index-dev.html';


fs.createReadStream(src).pipe(fs.createWriteStream(dest));
