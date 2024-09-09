"use client";

import { PagesEnum } from "@/enum/Pages";
import { useRouter } from "next/navigation";
import { FC } from "react";

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
  const { push } = useRouter();

  function handleSelectProfile(id: string) {
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
