/* eslint-disable no-console, func-names */
'use strict';

var gitTag = require('./');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));

gitTag(repoPath, {
  // name: 'v0.9.11'
}).on('data', function(data) {
  if (data.name) {
    console.log('\n------------------\n');
    console.log('Tag: ' + data.name);
    console.log('Title: ' + data.title);
  } else {
    console.log('Desc: ' + data.description);
  }
}).on('error', function(err) {
  throw err;
}).on('end', function() {
  console.log('\nThat\'s all, folks!');
});
