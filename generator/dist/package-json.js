import { readFileSync, writeFileSync } from "node:fs";
export function readJsonFile(filePath) {
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content);
}
export function mergePackageJson(base, additions, projectName) {
    return {
        ...base,
        name: projectName,
        scripts: {
            ...base.scripts,
            ...additions.scripts,
        },
        dependencies: {
            ...base.dependencies,
            ...additions.dependencies,
        },
        devDependencies: {
            ...base.devDependencies,
            ...additions.devDependencies,
        },
    };
}
export function writeJsonFile(filePath, data) {
    writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}
