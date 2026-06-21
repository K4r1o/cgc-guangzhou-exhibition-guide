const fs = require('fs');
['src/data/exhibit_map.json', 'src/data/products.json'].forEach(f => {
  let data = fs.readFileSync(f, 'utf8');
  data = data.replace(/"\/images\//g, '"./images/');
  fs.writeFileSync(f, data, 'utf8');
});
