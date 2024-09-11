"use client"

import { Dialog } from "@/app/components/Dialog";
import { AddTagForm } from "@/app/components/tags/AddTagForm";
import { tagModalAtom } from "@/store/atoms/tagModalAtom";
import { useRecoilState } from "recoil";

export const AddTagModal = () => {
  const [open, setOpen] = useRecoilState(tagModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new tag" open={open} onClose={handleClose}>
      <AddTagForm />
    </Dialog>
  );
};
