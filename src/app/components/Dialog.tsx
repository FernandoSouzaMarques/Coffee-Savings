"use client";

import { tagModalAtom } from "@/store/atoms/tagModalAtom";
import {
  Description,
  Dialog as DialogHeadless,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FC, PropsWithChildren } from "react";
import { useRecoilState } from "recoil";

interface IDialogProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export const Dialog: FC<IDialogProps> = ({
  children,
  title,
  description,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useRecoilState(tagModalAtom);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <DialogHeadless
        open={isOpen}
        onClose={handleClose}
        className="relative z-50"
      >
        <div className="bg-base-500/60 fixed inset-0 w-screen h-screen"></div>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-base-100 p-10 rounded-lg border-none">
            <DialogTitle className="font-bold text-center text-xl">{title}</DialogTitle>
            {description && <Description>{description}</Description>}
            {children}
          </DialogPanel>
        </div>
      </DialogHeadless>
    </>
  );
};
