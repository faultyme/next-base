import { readFileSync, writeFileSync } from "node:fs";

export function readJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, "utf-8");

  return JSON.parse(content) as T;
}

export type PackageJson = {
  name: string;
  version: string;
  private: boolean;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  packageManager: string;
};

export type PackageJsonAdditions = {
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export function mergePackageJson(
  base: PackageJson,
  additions: PackageJsonAdditions,
  projectName: string
): PackageJson {
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

export function writeJsonFile<T>(filePath: string, data: T): void {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}
