"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { useSetRecoilState } from "recoil";
import { categoryModalAtom } from "@/store/atoms/categoryModalAtom";

export const HeadingWrapper = () => {
  const setOpenTagModal = useSetRecoilState(categoryModalAtom);
  
  function handleOpenCategoryModal() {
    setOpenTagModal(true);
  }

  return (
    <Heading
      title="Categories"
      description="Organize your postings with categories"
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={handleOpenCategoryModal}
    />
  );
};
