async function main() {
  let ic = require('../lib'),
    config = null;

  config = await ic([
    {
      type: 'json',
      source: {
        path: './test.json',
        charset: 'latin1'
      }
    },
    {
      type: 'yml',
      source: {
        path: './test.yml'
      }
    },
    {
      source: {
        prop3: 'Plain object property'
      }
    }
  ]);

  console.log(config);
}

main();
