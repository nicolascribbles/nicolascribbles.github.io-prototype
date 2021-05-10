import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN_GITHUB,
});

export default function Octokit(){
  await octokit.request('GET /repos/{owner}/{repo}', {
  owner: 'octocat',
  repo: 'hello-world'
  })
  .then()
}