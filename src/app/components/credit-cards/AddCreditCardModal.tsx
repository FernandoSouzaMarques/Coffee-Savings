"use client"

import { Dialog } from "@/app/components/Dialog";
import { AddCreditCardForm } from "@/app/components/credit-cards/AddCreditCardForm";
import { creditCardModalAtom } from "@/store/atoms/creditCardModalAtom";
import { FC } from "react";
import { useRecoilState } from "recoil";

interface IAccount {
  id: string;
  name: string;
  icon: string;
}

interface IAddCreditCardModalProps {
  accounts: IAccount[]
}

export const AddCreditCardModal: FC<IAddCreditCardModalProps>  = ({ accounts }) => {
  const [open, setOpen] = useRecoilState(creditCardModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new credit card" open={open} onClose={handleClose}>
      <AddCreditCardForm accounts={accounts} />
    </Dialog>
  );
};
