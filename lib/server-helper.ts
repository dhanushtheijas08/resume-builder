import { auth } from "@/lib/auth";
import { Session, User } from "better-auth";
import { headers } from "next/headers";

type UserType = {
  session: Session;
  user: User;
};

export async function getUserSession(): Promise<UserType | Error> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized: No session found");
  return session;
}
