import { getToken } from "next-auth/jwt";

import { findUser } from "@/lib/db/queries/user/find-user";

const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "production" ? "__Secure-accessToken" : "accessToken";

const SESSION_SALT =
  process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token";

export async function getAuthenticatedUser(request: Request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    salt: SESSION_SALT,
    cookieName: SESSION_COOKIE_NAME,
  });

  if (!token?.sub) {
    return null;
  }

  const user = await findUser({
    type: "id",
    value: token.sub,
  });

  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return user;
}
