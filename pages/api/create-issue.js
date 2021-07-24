const { Octokit } = require("@octokit/rest");

const accessToken = process.env.GH_ACCESS_TOKEN;
const owner = process.env.GH_REPO_OWNER;
const repo = process.env.GH_REPO_NAME;

const octokit = new Octokit({
  auth: accessToken,
  userAgent: "battlecry v0.1",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const createIssue = async (req, res) => {
  const title = req.body.issueTitle;
  console.log(title);

  try {
    octokit.rest.issues.create({
      owner,
      repo,
      title,
    });
    res.status(200).json({
      msg: "went through!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: "Something went wrong with your submission.",
    });
  }
};

export default createIssue;
