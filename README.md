# git-tag-stream

Get the repo tags (or a specific tag) in a Node streamy way by shelling out to [git-tag(1)](https://www.kernel.org/pub/software/scm/git/docs/git-tag.html).

[![build status](https://secure.travis-ci.org/alessioalex/git-tag-stream.png)](http://travis-ci.org/alessioalex/git-tag-stream)

## Usage

```js
gitTag(repoPath, [options])
```

Where `options` can contain `name` if you wish to retrieve a specific tag instead of the whole list.

Example:

```js
var gitTag = require('git-tag-stream');

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
```

Sample output:

```bash
→ node example.js
------------------

Tag: v0.9.9
Title: 2013.02.07, Version 0.9.9 (Unstable)
Desc: * tls: port CryptoStream to streams2 (Fedor Indutny)
Desc: 
Desc: * typed arrays: only share ArrayBuffer backing store (Ben Noordhuis)
Desc: 
Desc: * stream: make Writable#end() accept a callback function (Nathan Rajlich)
Desc: 
Desc: * buffer: optimize 'hex' handling (Ben Noordhuis)
Desc: 
Desc: * dns, cares: don't filter NOTIMP, REFUSED, SERVFAIL (Ben Noordhuis)
Desc: 
Desc: * readline: treat bare \r as a line ending (isaacs)
Desc: 
Desc: * readline: make \r\n emit one 'line' event (Ben Noordhuis)
Desc: 
Desc: * cluster: support datagram sockets (Bert Belder)
Desc: 
Desc: * stream: Correct Transform class backpressure (isaacs)
Desc: 
Desc: * addon: Pass module object to NODE_MODULE init function (isaacs, Rod Vagg)
Desc: 
Desc: * buffer: slow buffer copy compatibility fix (Trevor Norris)
Desc: 
Desc: * Add bytesWritten to tls.CryptoStream (Andy Burke)

------------------

Tag: v1.0.0
Title: 2015-01-14 io.js v1.0.0 Release

------------------
...

That's all, folks!
```

## Tests

```
npm test
```

## License

[MIT](http://alessioalex.mit-license.org/)
