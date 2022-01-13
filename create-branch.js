async function createBranch(octokit, repo, sha, branch) {
  console.debug('Creating branch...', branch);
  try {
    await octokit.rest.repos.getBranch({
      ...repo,
      branch,
    });
    console.debug('Created branch.');
  } catch (error) {
    console.error('Error creating branch: ', error);
    if (error.name === "HttpError" && error.status === 404) {
      await octokit.rest.git.createRef({
        ref: `refs/heads/${branch}`,
        sha: sha,
        ...repo,
      });
    } else {
      console.log("Error while creating new branch");
      throw Error(error);
    }
  }
}

module.exports = createBranch;
