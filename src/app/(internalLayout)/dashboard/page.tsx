import { Fragment } from "react";
import { cookies } from "next/headers";
import { HeadingWrapper } from "@/app/components/dashboard/HeadingWrapper";
import { client } from "@/config/client";

interface IUserProfile {
  id: string;
  avatar: string;
  name: string;
}

async function getUserData(id?: string): Promise<IUserProfile | undefined> {
  if (!id) return;
  return await client(`/users?id=${id}`);
}

export default async function Dashboard() {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const user = await getUserData(loggedUser?.value);

  return (
    <Fragment>
      <HeadingWrapper name={user?.name ?? ""} />
      <div className="mt-10">
        <p>content...</p>
      </div>
    </Fragment>
  );
}
