"use server";

import { PagesEnum } from "@/enum/Pages";
import Link from "next/link";
import { ProfileList } from "@/app/components/ProfileList";
import { client } from "@/config/client";
import { AddProfileButton } from "@/app/components/AddProfileButton";
import { AddProfileModal } from "@/app/components/AddProfileModal";

interface IUserProfile {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

async function getUsers(): Promise<IUserProfile[]> {
  return await client("/users");
}

export default async function Home() {
  const profiles = await getUsers();

  const hasProfiles = profiles.length > 0;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-3xl text-center font-bold">
        {hasProfiles
          ? "Who will access it?"
          : "Before you start, create a profile"}
      </h1>

      <ProfileList list={profiles} />
      <AddProfileButton />

      {hasProfiles && (
        <Link
          href={PagesEnum.MANAGE_PROFILE}
          className="uppercase font-bold absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          Manage profiles
        </Link>
      )}

      <AddProfileModal />
    </main>
  );
}
