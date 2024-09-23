"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { useSetRecoilState } from "recoil";
import { transactionModalAtom } from "@/store/atoms/transactionModalAtom";

export const HeadingWrapper = () => {
  const setOpenTagModal = useSetRecoilState(transactionModalAtom);
  
  function handleOpenTransactionModal() {
    setOpenTagModal(true);
  }
  return (
    <Heading
      title="Cash flow"
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={handleOpenTransactionModal}
    />
  );
};
