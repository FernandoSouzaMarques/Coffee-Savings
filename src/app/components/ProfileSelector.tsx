"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PagesEnum } from "@/enum/Pages";
import { useCookies } from "@/app/hooks/useCookies";
import { Icon } from "@/app/components/Icon";
import { revalidateDashboard } from "@/app/server-actions/revalidatePaths";

interface IProfileSelectorProps {
  id: string;
  avatar: string;
  nickname: string;
}

export const ProfileSelector: FC<IProfileSelectorProps> = ({
  id,
  avatar,
  nickname
}): JSX.Element => {
  const {setCookies} = useCookies();
  const { push } = useRouter();

  function handleSelectProfile(id: string) {
    setCookies("userId", id);
    revalidateDashboard();
    void push(PagesEnum.DASHBOARD);
  }

  function getAvatar() {
    return `/images/profiles/${avatar}.jpg`;
  }
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-between"
      onClick={() => handleSelectProfile(id)}
    >
      <Icon icon={getAvatar()} size="lg" />
      <span className="inline-block mt-2 font-bold">{nickname}</span>
    </button>
  );
};
