const fs = require('fs');

function updateFile(environment, version) {
  const filePath = `./${environment}.yaml`;
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    const content = file.replace(/(?<=tag: )(.*?)(?=\s)/, version);
    return content;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateFile,
};
