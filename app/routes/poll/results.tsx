import type { User } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getUsers } from "~/routes/poll/user.server";

export const loader: LoaderFunction = async () => {
  const users: User[] = await getUsers();
  return json({ users });
};
