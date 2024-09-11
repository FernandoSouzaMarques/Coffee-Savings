"use client";

import { profileModalAtom } from "@/store/atoms/profileModalAtom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSetRecoilState } from "recoil";

export const AddProfileButton = () => {
  const setOpenProfileModal = useSetRecoilState(profileModalAtom);

  function handleOpenAddProfile() {
    setOpenProfileModal(true);
  }
  return (
    <button className="mt-10" onClick={handleOpenAddProfile}>
      <span className="leading-[0] text-7xl flex justify-center items-center border-2 border-white rounded-full w-20 aspect-square">
        <span className="sr-only">Add profile</span>
        <PlusIcon className="w-16" />
      </span>
      <span className="inline-block mt-2 font-bold">Add profile</span>
    </button>
  );
};
