"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PagesEnum } from "@/enum/Pages";
import { useCookies } from "@/app/hooks/useCookies";

interface IProfileSelector {
  id: string;
  avatar: string;
  name: string;
}

export const ProfileSelector: FC<IProfileSelector> = ({
  id,
  avatar,
  name,
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
      className="text-center"
      onClick={() => handleSelectProfile(id)}
    >
      <picture className="flex bg-error rounded-full overflow-hidden w-20 aspect-square">
        <img src={avatar} alt="" />
      </picture>
      <span className="inline-block mt-2 font-bold">{name}</span>
    </button>
  );
};
