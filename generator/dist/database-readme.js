import { readFileSync, writeFileSync } from "node:fs";
export function appendDatabaseReadme(readmePath, databaseReadmePath) {
    const readme = readFileSync(readmePath, "utf-8");
    const databaseReadme = readFileSync(databaseReadmePath, "utf-8");
    const updatedReadme = `${readme.trimEnd()}\n\n${databaseReadme.trim()}\n`;
    writeFileSync(readmePath, updatedReadme, "utf-8");
}
