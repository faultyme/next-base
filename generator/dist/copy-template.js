import { cpSync } from "node:fs";
export function copyTemplate(source, destination, options) {
    cpSync(source, destination, {
        recursive: true,
        force: true,
        filter: options?.filter,
    });
}
