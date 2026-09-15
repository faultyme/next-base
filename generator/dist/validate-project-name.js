export function isValidProjectName(projectName) {
    return /^[a-z0-9_-]+$/.test(projectName);
}
