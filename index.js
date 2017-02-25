const fs = require('fs');
const path = require('path');

exports.resolvedPath = function(directoryPath, fileName) {
    return path.resolve(directoryPath, fileName);
};

exports.readFile = function(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', (err, result) => {
            if (err) reject();
            resolve(result);
        });
    });
};

exports.readDir = function(dirPath) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirPath, (err, result) => {
            if (err) reject();
            resolve(result);
        });
    });
};

exports.readDirFiles = function(dirPath) {
    var mapper = function asyncmap(f) {
        return exports.readFile(f)
        .catch(function(err) {});
    };

    let filePaths = [];
    return exports.readDir(dirPath)
    .then(function(results) {
        results.forEach(function(file) {
            filePaths.push(exports.resolvedPath(dirPath, file));
        });
        return Promise.resolve(filePaths);
    })
    .then(function(data) {
        return Promise.all(data.map(mapper));
    })
    .then(function(data) {
        return Promise.resolve(data);
    })
    .catch(function(err) {
        return Promise.reject();
    });
};