import { readFileSync, writeFileSync } from "node:fs";

export function updateProjectReadme(readmePath: string, projectName: string): void {
  const content = readFileSync(readmePath, "utf-8");

  const updatedContent = content.replace("<project-name>", projectName);

  writeFileSync(readmePath, updatedContent, "utf-8");
}
