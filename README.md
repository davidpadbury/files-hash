# files-hash

Hash a glob of files. Useful for caching and things.

## Installation

Install the package with npm.

```
npm install files-hash
```

## Usage

```javascript
var hash = require('files-hash');

hash('**/*.txt', { cwd: 'test/example' })
    .then(function(hashes) {
        console.log(hashes);
    });

/**
 * Produces:
 * { 'hello1.txt': '75fdf620d8a1c7e6ea7f4c24ba5ff991fbb82e86',
   'hello2.txt': '38ffd0b05376325c933e89ff8f0c2ccf1de05a01' }
 **/
```

## API

### hash(glob, [options]) : Promise

* **glob**: String glob pattern. [Documentation of glob syntax](https://www.npmjs.com/package/glob#glob-primer).
* **option**: Object passed to glob module. [Documentation of glob options](https://www.npmjs.com/package/glob#options).

Returns a Promise which resolves with an object where each key is a path relative to the glob cwd. The SHA1 hash of that file is the value.
