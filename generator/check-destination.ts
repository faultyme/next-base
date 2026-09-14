import { existsSync } from "node:fs";

export function destinationExists(projectName: string): boolean {
  return existsSync(projectName);
}
