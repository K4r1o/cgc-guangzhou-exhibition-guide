const fs = require('fs');
const readline = require('readline');
const transcriptPath = 'C:\\Users\\chang\\.gemini\\antigravity\\brain\\44666740-4905-4b3a-bd04-e17e96c86aa1\\.system_generated\\logs\\transcript_full.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(transcriptPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let exhibit_map = null;
  let products = null;

  for await (const line of rl) {
    if (line.includes('write_to_file')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          for (let call of obj.tool_calls) {
            if (call.name === 'write_to_file') {
              if (call.args.TargetFile && call.args.TargetFile.endsWith('exhibit_map.json')) {
                exhibit_map = call.args.CodeContent;
              }
              if (call.args.TargetFile && call.args.TargetFile.endsWith('products.json')) {
                products = call.args.CodeContent;
              }
            }
          }
        }
      } catch(e) {}
    }
  }

  if (exhibit_map) {
    fs.writeFileSync('src/data/exhibit_map.json', exhibit_map, 'utf8');
    console.log('Restored exhibit_map.json');
  }
  if (products) {
    fs.writeFileSync('src/data/products.json', products, 'utf8');
    console.log('Restored products.json');
  }
}

processLineByLine();
