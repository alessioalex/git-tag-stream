'use strict';

var gitSpawnedStream = require('git-spawned-stream');
var parseStream = require('./lib/parser');

function streamTags(repoPath, options) {
  var descriptionLimit = options.descriptionLimit || 1000;
  var args = ['tag', '-n' + descriptionLimit];

  if (options.name) {
    args.push('-l', options.name);
  }

  return parseStream(gitSpawnedStream(repoPath, args));
}

module.exports = streamTags;
