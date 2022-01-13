async function createBranch(octokit, repo, sha, branch) {
  try {
    await octokit.rest.repos.getBranch({
      ...repo,
      branch,
    });
  } catch (error) {
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
