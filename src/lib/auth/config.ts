const authSecret = process.env.AUTH_SECRET;

if (!authSecret) {
  throw new Error("AUTH_SECRET is not configured");
}

export const AUTH_SECRET = authSecret;

export const AUTH_SESSION_SALT =
  process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token";

export const AUTH_JWT_MAX_AGE = 30 * 24 * 60 * 60;
