const { Buffer } = require('buffer');

async function getRepo({ github, owner, repo, path }) {
  try {
    const { data } = await github.rest.repos.getContent({ owner, repo, path });
    return data;
  } catch (error) {
    throw error;
  }
}

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

async function updateFile() {
  try {
    await github.rest.repos.createOrUpdateFileContents({
      owner,
      repo: REPO,
      path,
      content,
      sha: data.sha,
      message: `Bumps to ${VERSION}`,
      committer: {
        name: context.actor,
        email: 'miketheocodes@gmail.com',
      },
      author: {
        name: context.actor,
        email: 'miketheocodes@gmail.com',
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRepo,
  updateVersionInFile,
  updateFile,
};

// updateFile('dev', 'v1.0.76');
