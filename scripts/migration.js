const GITHUB_USER = "JulienUsson";
const GITHUB_REPOSITORY = "cookbook";

const https = require("https");
const fs = require("fs");
const util = require("util");
const path = require("path");
const cp = require("child_process");
const exec = util.promisify(cp.exec);
const writeFile = util.promisify(fs.writeFile);
const kebabCase = require("lodash/kebabCase");

const fetchIssues = () =>
  new Promise((resolve, reject) => {
    https.get(
      {
        hostname: "api.github.com",
        path: `/repos/${GITHUB_USER}/${GITHUB_REPOSITORY}/issues?per_page=100`,
        headers: { "User-Agent": "Mozilla/5.0" },
      },
      (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          resolve(JSON.parse(body));
        });
        res.on("error", (error) => reject(error));
      }
    );
  });

async function main() {
  const issues = await fetchIssues();
  for (const issue of issues) {
    const { title, body, labels } = issue;
    const slug = kebabCase(title);
    const filename = `${slug}.md`;
    const tags = labels.map((l) => l.name);

    let recipe = "";
    const lines = body.split("\r\n");
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (line === "---" && index !== 0 && tags.length > 0) {
        recipe += "tags:\r\n";
        for (tag of tags) {
          recipe += `  - ${tag}\r\n`;
        }
      }

      if (line.startsWith("image: ")) {
        const sourceUrl = line.substr("image: ".length);
        const imageName = `${slug}.jpg`;
        await exec(
          `wget ${sourceUrl} -O ${path.join(
            __dirname,
            "../static/img/",
            imageName
          )}`
        );
        recipe += `image: /img/${imageName}\r\n`;
      } else {
        let refactoredLine = line;
        refactoredLine = refactoredLine.replace("durée:", "duration:");
        refactoredLine = refactoredLine.replace("personnes:", "servings:");
        refactoredLine = refactoredLine.replace("ingrédients:", "ingredients:");
        recipe += refactoredLine + "\r\n";
      }

      if (index === 0) {
        recipe += "templateKey: 'recipe-post'\r\n";
        recipe += `title: ${title}\r\n`;
      }
    }

    await writeFile(
      path.join(__dirname, "../src/pages/recipes/", filename),
      recipe
    );
  }
}
main();
