import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyTemplate } from "./copy-template";
import {
  mergePackageJson,
  readJsonFile,
  writeJsonFile,
  type PackageJson,
  type PackageJsonAdditions,
} from "./package-json";

import { updateProjectReadme } from "./project-readme";
import { appendDatabaseReadme } from "./database-readme";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateProject(projectName: string, includeDatabase: boolean) {
  const coreTemplatePath = path.join(__dirname, "templates", "core");

  mkdirSync(projectName);

  copyTemplate(coreTemplatePath, projectName);

  const corePackagePath = path.join(projectName, "package.json");

  const corePackage = readJsonFile<PackageJson>(corePackagePath);

  const updatedCorePackage = {
    ...corePackage,
    name: projectName,
  };

  writeJsonFile(corePackagePath, updatedCorePackage);

  const readmePath = path.join(projectName, "README.md");

  updateProjectReadme(readmePath, projectName);
  if (includeDatabase) {
    const databaseTemplatePath = path.join(__dirname, "templates", "database");

    copyTemplate(databaseTemplatePath, projectName, {
      filter: sourcePath => !sourcePath.endsWith("package.additions.json"),
    });

    const databaseAdditionsPath = path.join(
      __dirname,
      "templates",
      "database",
      "package.additions.json"
    );

    const databaseAdditions = readJsonFile<PackageJsonAdditions>(databaseAdditionsPath);

    const mergedPackage = mergePackageJson(updatedCorePackage, databaseAdditions, projectName);

    writeJsonFile(corePackagePath, mergedPackage);

    const databaseReadmePath = path.join(__dirname, "templates", "database", "README.database.md");

    appendDatabaseReadme(readmePath, databaseReadmePath);
  }

  console.log("Generating project:", projectName);
  console.log("Include Database:", includeDatabase);
  console.log("Core template:", coreTemplatePath);
}
