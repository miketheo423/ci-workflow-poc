const { Buffer } = require('buffer');

async function getLatestRelease({ github, owner, repo }) {
  try {
    const { data } = await github.rest.repos.getLatestRelease({ owner, repo });
    return data;
  } catch (error) {
    throw error;
  }
}

// Gets the values.yaml file that needs to be updated for the deployment
async function getValuesFile({ github, owner, repo, path }) {
  try {
    const { data } = await github.rest.repos.getContent({ owner, repo, path });
    return data;
  } catch (error) {
    throw error;
  }
}

// Updates the tag version number in file to match the latest release version
function updateVersionInFile(content, version) {
  try {
    const fileContent = Buffer.from(content, 'base64').toString('utf8');
    const updatedContent = fileContent.replace(/(?<=tag: )(.*?)(?=\s)/, version);
    const base64Content = Buffer.from(updatedContent).toString('base64');
    return base64Content;
  } catch (err) {
    throw err;
  }
}

// Commits file back into deployment repo
async function updateValuesFile({ github, owner, path, repo, content, sha, version }) {
  try {
    await github.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      content,
      sha,
      message: `Bumps to ${version}`,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getLatestRelease,
  getValuesFile,
  updateVersionInFile,
  updateValuesFile,
};
