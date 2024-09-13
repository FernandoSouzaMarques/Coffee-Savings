"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PagesEnum } from "@/enum/Pages";
import { useCookies } from "@/app/hooks/useCookies";

interface IProfileSelector {
  id: string;
  avatar: string;
  nickname: string;
}

export const ProfileSelector: FC<IProfileSelector> = ({
  id,
  avatar,
  nickname
}): JSX.Element => {
  const [setCookies] = useCookies();
  const { push } = useRouter();

  function handleSelectProfile(id: string) {
    setCookies("userId", id);
    void push(PagesEnum.DASHBOARD);
  }
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-between"
      onClick={() => handleSelectProfile(id)}
    >
      <picture className="flex bg-error rounded-full overflow-hidden w-20 aspect-square">
        <img src={avatar} alt="" />
      </picture>
      <span className="inline-block mt-2 font-bold">{nickname}</span>
    </button>
  );
};
