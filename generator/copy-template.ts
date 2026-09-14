import { cpSync } from "node:fs";

export function copyTemplate(
  source: string,
  destination: string,
  options?: {
    filter?: (sourcePath: string) => boolean;
  }
) {
  cpSync(source, destination, {
    recursive: true,
    force: true,
    filter: options?.filter,
  });
}
