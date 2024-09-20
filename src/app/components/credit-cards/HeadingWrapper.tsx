"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { useSetRecoilState } from "recoil";
import { creditCardModalAtom } from "@/store/atoms/creditCardModalAtom";

export const HeadingWrapper = () => {
  const setOpenTagModal = useSetRecoilState(creditCardModalAtom);
  
  function handleOpenCreditCardModal() {
    setOpenTagModal(true);
  }
  return (
    <Heading
      title="Credit cards"
      description="Here are your cards."
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={handleOpenCreditCardModal}
    />
  );
};
