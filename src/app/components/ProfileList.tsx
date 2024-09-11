"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { ProfileSelector } from "@/app/components/ProfileSelector";
import { useCookies } from "@/app/hooks/useCookies";
import { PagesEnum } from "@/enum/Pages";

interface IProfile {
  id: string;
  name: string;
  avatar: string;
}

interface IProfileList {
  list: IProfile[];
}

export const ProfileList: FC<IProfileList> = ({ list }): JSX.Element => {
  const [setCookies] = useCookies();
  const { push } = useRouter();

  function selectOnlyProfile() {
    setCookies("userId", list[0].id);
  }

  if (list.length === 1) {
    selectOnlyProfile();
    // push(PagesEnum.DASHBOARD);
  }

  return (
    <ul className="flex justify-center items-center space-x-10 mt-10">
      {list.map((profile) => (
        <li key={profile.id}>
          <ProfileSelector {...profile} />
        </li>
      ))}
    </ul>
  );
};
