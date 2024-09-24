"use client"

import { Dialog } from "@/app/components/Dialog";
import { AddTransactionForm } from "@/app/components/cash-flow/AddTransactionForm";
import { transactionModalAtom } from "@/store/atoms/transactionModalAtom";
import { IAccount } from "@/types/Account.type";
import { ICategory } from "@/types/Category.type";
import { FC } from "react";
import { useRecoilState } from "recoil";

interface IAddTransactionModalProps {
  accounts: IAccount[];
  categories: Record<string, ICategory[]>;
}

export const AddTransactionModal: FC<IAddTransactionModalProps>  = ({ accounts, categories }) => {
  const [open, setOpen] = useRecoilState(transactionModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new transaction" open={open} onClose={handleClose}>
      <AddTransactionForm categories={categories} accounts={accounts} />
    </Dialog>
  );
};
