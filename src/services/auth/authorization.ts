import type { User } from "@/lib/db/schemas/user.schema";

type AllowedRole = User["role"];

export function hasRole(user: User, allowedRoles: AllowedRole[]): boolean {
  return allowedRoles.includes(user.role);
}

export function requireRole(user: User, allowedRoles: AllowedRole[]): void {
  if (!hasRole(user, allowedRoles)) {
    throw new Error("FORBIDDEN");
  }
}
