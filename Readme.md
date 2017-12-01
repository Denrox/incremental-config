## Installation

  Requires nodejs >= 7.6

```bash
$ npm i incremental-config
```

## Features

  * Combines configuration object from different sources
  * Supports YAML, JSON files and common JS objects
  * Allows to adjust priority of some config source by changing it's position in sequence

## Examples

  Here is a simple usage example:

```bash
$ npm i incremental-config
```

```javascript
async function main() {
  let ic = require('incremental-config'),
    config = null;

  config = await ic([
    //following configuration source will have the lowest priority
    {
      type: 'json',
      source: {
        path: './test.json',
        charset: 'latin1'
      }
    },
    //higher priority for this one
    {
      type: 'yml',
      source: {
        path: './test.yml' //utf8 charset is applied when none specified
      }
    },
    //this source will have the highest priority.
    //it will override properties with same names from other sources
    {
      source: {
        testValue: 'someValue'
      }
    }
  ]);

  console.log(config);
}

main();
```

  The result of this code will be a config object which has merged contents of all listed sources.

## License

  [MIT](LICENSE)
