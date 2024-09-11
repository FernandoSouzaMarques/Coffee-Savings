"use server";

import { PagesEnum } from "@/enum/Pages";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ProfileList } from "@/app/components/ProfileList";
import { client } from "@/config/client";

interface IUserProfile {
  id: string;
  name: string;
  avatar: string;
}

async function getUsers(): Promise<IUserProfile[]> {
  return await client("/users");
}

export default async function Home() {
  const profiles = await getUsers();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-3xl text-center font-bold">Who will access it?</h1>

      <ProfileList list={profiles} />
      <Link href={PagesEnum.ADD_PROFILE} className="mt-10">
        <span className="leading-[0] text-7xl flex justify-center items-center border-2 border-white rounded-full w-20 aspect-square">
          <span className="sr-only">Add profile</span>
          <PlusIcon className="w-16" />
        </span>
        <span className="inline-block mt-2 font-bold">Add profile</span>
      </Link>

      <Link
        href={PagesEnum.MANAGE_PROFILE}
        className="uppercase font-bold absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        Manage profiles
      </Link>
    </main>
  );
}
