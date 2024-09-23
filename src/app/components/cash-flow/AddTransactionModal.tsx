"use client"

import { Dialog } from "@/app/components/Dialog";
import { AddTransactionForm } from "@/app/components/cash-flow/AddTransactionForm";
import { transactionModalAtom } from "@/store/atoms/transactionModalAtom";
import { FC } from "react";
import { useRecoilState } from "recoil";

interface IAccount {
  id: string;
  name: string;
  icon: string;
}

interface IAddTransactionModalProps {
  accounts: IAccount[]
}

export const AddTransactionModal: FC<IAddTransactionModalProps>  = ({ accounts }) => {
  const [open, setOpen] = useRecoilState(transactionModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new transaction" open={open} onClose={handleClose}>
      <AddTransactionForm accounts={accounts} />
    </Dialog>
  );
};
