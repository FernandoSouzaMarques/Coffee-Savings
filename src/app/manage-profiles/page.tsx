"use server";

import { ProfileList } from "@/app/components/ProfileList";
import { client } from "@/config/client";
import { AddProfileButton } from "@/app/components/AddProfileButton";
import { AddProfileModal } from "@/app/components/AddProfileModal";

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
      <h1 className="text-3xl text-center font-bold">Profiles</h1>

      <ProfileList list={profiles} />
      <AddProfileButton />
      <AddProfileModal />
    </main>
  );
}
