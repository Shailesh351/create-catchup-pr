async function createBranch(octokit, repo, sha, branch) {
  try {
    console.debug('Checking branch...', branch);
    await octokit.rest.repos.getBranch({
      ...repo,
      branch,
    });
    console.debug('Branch exists');
  } catch (error) {
    console.error('Branch not found', error);
    if (error.name === "HttpError" && error.status === 404) {
      console.debug('Creating branch...', branch);
      console.debug({
        ref: `refs/heads/${branch}`,
        sha: sha,
        ...repo,
      });

      const {owner, repo: repoName} = repo;
      await octokit.request(`POST /repos/${owner}/${repoName}/git/refs`, {
        ref: `refs/heads/${branch}`,
        sha: sha,
        ...repo,
      });

      // await octokit.rest.git.createRef({
      //   ref: `refs/heads/${branch}`,
      //   sha: sha,
      //   ...repo,
      // });
      console.debug('Created branch...', branch);
    } else {
      console.log("Error while creating new branch");
      throw Error(error);
    }
  }
}

module.exports = createBranch;
