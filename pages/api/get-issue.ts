import { NextApiHandler } from "next";
import { Octokit } from "@octokit/core";

const accessToken = process.env.GH_ACCESS_TOKEN;

const octokit = new Octokit({ auth: accessToken });

const getIssue: NextApiHandler = async (req, res) => {
  try {
    const response = await octokit.request("GET /orgs/{org}/repos", {
      org: "octokit",
      type: "private",
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

export default getIssue;
