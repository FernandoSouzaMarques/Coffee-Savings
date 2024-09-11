"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { useSetRecoilState } from "recoil";
import { tagModalAtom } from "@/store/atoms/tagModalAtom";

export const HeadingWrapper = () => {
  const setOpenTagModal = useSetRecoilState(tagModalAtom);
  function handleOpenTagModal() {
    setOpenTagModal(true);
  }

  return (
    <Heading
      title="Tags"
      description="Create tags for important things"
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={handleOpenTagModal}
    />
  );
};
