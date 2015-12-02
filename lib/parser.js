'use strict';

var splitStream = require('split-transform-stream');

function streamTags(inputStream) {
  var lastBuf = '';
  var buf = {};

  var write = function write(line, enc, cb) {
    var l = line.toString('utf8');
    // TODO: other allowed chars in tag name?
    var tmp = l.match(/^([\w-.\/]+) (.*)/);

    if (buf.name || buf.description || buf.description === '') {
      this.push(buf);
    }

    if (tmp) {
      buf = {
        name: tmp[1],
        title: tmp[2].replace(/^\s+/, '')
      };

      lastBuf = 'tag';
    } else {
      var chunk = {
        description: l.replace(/^    /, '')
      };

      // first line of the description is empty so ignore it
      if (!(lastBuf === 'tag' && !chunk.description)) {
        buf = chunk;
      } else {
        buf = {};
      }

      lastBuf = 'desc';
    }

    cb();
  };

  var end = function end(cb) {
    // when the last line of the desc is empty ignore it
    if (buf.name || buf.description) {
      this.push(buf);
    }

    setImmediate(function delayEnd() {
      cb();
    });
  };

  return splitStream(inputStream, write, end);
}

module.exports = streamTags;
