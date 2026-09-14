export function isValidProjectName(projectName: string): boolean {
  return /^[a-z0-9_-]+$/.test(projectName);
}
