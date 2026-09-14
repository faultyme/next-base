import { input, confirm } from "@inquirer/prompts";
import { generateProject } from "./generator";
import { isValidProjectName } from "./validate-project-name";
import { destinationExists } from "./check-destination";

async function main() {
  let projectName = process.argv[2];

  if (!projectName) {
    projectName = await input({
      message: "What is your project name?",
    });
  }

  if (!isValidProjectName(projectName)) {
    console.error(
      "Invalid project name. Use only lowercase letters, numbers, hyphens, and underscores."
    );
    process.exit(1);
  }

  if (destinationExists(projectName)) {
    console.error(`A folder named "${projectName}" already exists.`);
    process.exit(1);
  }
  const includeDatabase = await confirm({
    message: "Do you want to include Database?",
    default: false,
  });

  generateProject(projectName, includeDatabase);
}

main();
