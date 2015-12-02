/* eslint-disable no-console, func-names */
'use strict';

var fs = require('fs');
var test = require('tape');
var streamingParser = require('../lib/parser');
var zlib = require('zlib');

test('git-tag-stream', function(t) {
  var TAGS_NUMBER = 317;
  var expectedTags = fs.readFileSync(__dirname + '/tags.txt', 'utf8').split('\n');
  // delete last (empty) item
  expectedTags.pop();

  var tags = [];
  var dataEvents = 0;

  var rs = fs.createReadStream(__dirname + '/in.txt.gz');
  var gunzip = zlib.createGunzip();

  streamingParser(rs.pipe(gunzip))
    .on('data', function(chunk) {
      dataEvents++;

      if (chunk.name) {
        tags.push({
          name: chunk.name,
          title: chunk.title
        });
      } else {
        if (!tags[tags.length - 1].description) {
          tags[tags.length - 1].description = '';
        }

        tags[tags.length - 1].description += '\n' + chunk.description;
      }
    }).on('error', function(err) {
      throw err;
    }).on('end', function() {
      t.equal(tags.length, TAGS_NUMBER, 'identify tags correctly');
      t.deepEqual(tags.map(function(tag) { return tag.name; }), expectedTags);
      t.end();
    });
});
