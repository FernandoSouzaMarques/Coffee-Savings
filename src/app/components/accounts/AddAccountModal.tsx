"use client"

import { Dialog } from "@/app/components/Dialog";
import { AddAccountForm } from "@/app/components/accounts/AddAccountForm";
import { accountModalAtom } from "@/store/atoms/accountModalAtom";
import { useRecoilState } from "recoil";

export const AddAccountModal = () => {
  const [open, setOpen] = useRecoilState(accountModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new account" open={open} onClose={handleClose}>
      <AddAccountForm />
    </Dialog>
  );
};
