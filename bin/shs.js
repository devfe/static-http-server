#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var argv  = require('minimist')(process.argv.slice(2));
var server = require('../index.js');

var rootDir = argv._[0] || process.cwd();
var PORT = argv.port || 1024;

if ( rootDir ) {
    var isDir = fs.lstatSync(rootDir).isDirectory();

    if ( isDir ) {
        server(argv._[0], {
            index: false,
            port: PORT
        });
    } else {
        console.log('Root dir [%s] not found, or is not a directory.', path.relative(process.cwd(), rootDir));
    }
}