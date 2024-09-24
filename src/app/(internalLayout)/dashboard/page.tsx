import { Fragment } from "react";
import { cookies } from "next/headers";
import { HeadingWrapper } from "@/app/components/dashboard/HeadingWrapper";
import { client } from "@/config/client";
import { IUser } from "@/types/User.type";

async function getUserData(id?: string): Promise<IUser | undefined> {
  if (!id) return;
  return await client(`/users?id=${id}`);
}

export default async function Dashboard() {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const user = await getUserData(loggedUser?.value);

  return (
    <Fragment>
      <HeadingWrapper name={user?.nickname ?? ""} />
      <div className="mt-10">
        <p>content...</p>
      </div>
    </Fragment>
  );
}
