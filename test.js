const testing = require('./index.js');

/*console.log(testing.resolvedPath('/foo/bar/', 'index.txt'));
testing.readFile('./index.js')
.then(function(result) {
    console.log(result);
});
testing.readDir('./')
.then(function(result) {
    console.log(result);
});*/
testing.readDirFiles('./')
.then(function(result) {
    console.log(result);
});