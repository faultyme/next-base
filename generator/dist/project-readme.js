import { readFileSync, writeFileSync } from "node:fs";
export function updateProjectReadme(readmePath, projectName) {
    const content = readFileSync(readmePath, "utf-8");
    const updatedContent = content.replace("<project-name>", projectName);
    writeFileSync(readmePath, updatedContent, "utf-8");
}
