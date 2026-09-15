import { existsSync } from "node:fs";
export function destinationExists(projectName) {
    return existsSync(projectName);
}
