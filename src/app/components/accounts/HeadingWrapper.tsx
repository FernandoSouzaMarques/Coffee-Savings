"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { useSetRecoilState } from "recoil";
import { accountModalAtom } from "@/store/atoms/accountModalAtom";

export const HeadingWrapper = () => {
  const setOpenTagModal = useSetRecoilState(accountModalAtom);
  
  function handleOpenAccountModal() {
    setOpenTagModal(true);
  }
  return (
    <Heading
      title="Accounts"
      description="Here are all your accounts. You can edit them and adjust their balances."
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={handleOpenAccountModal}
    />
  );
};
