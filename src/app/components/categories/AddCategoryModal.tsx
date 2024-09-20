"use client";

import { Dialog } from "@/app/components/Dialog";
import { AddCategoryForm } from "@/app/components/categories/AddCategoryForm";
import { categoryModalAtom } from "@/store/atoms/categoryModalAtom";
import { useRecoilState } from "recoil";

export const AddCategoryModal = () => {
  const [open, setOpen] = useRecoilState(categoryModalAtom);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog title="Create a new category" open={open} onClose={handleClose}>
      <AddCategoryForm />
    </Dialog>
  );
};
