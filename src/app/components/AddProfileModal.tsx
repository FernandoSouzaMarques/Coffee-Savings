"use client";

import { Dialog } from "@/app/components/Dialog";
import { profileModalAtom } from "@/store/atoms/profileModalAtom";
import { useRecoilState } from "recoil";
import { NewProfileForm } from "./NewProfileForm";

export const AddProfileModal = () => {
  const [open, setOpen] = useRecoilState(profileModalAtom);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog title="Create a new profile" open={open} onClose={handleClose}>
      <NewProfileForm />
    </Dialog>
  );
};
