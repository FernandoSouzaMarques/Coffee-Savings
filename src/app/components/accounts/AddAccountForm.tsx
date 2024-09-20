"use client";

import { client } from "@/config/client";
import { FormEvent, useMemo, useState } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { accountModalAtom } from "@/store/atoms/accountModalAtom";
import { useCookies } from "@/app/hooks/useCookies";
import { Icon } from "@/app/components/Icon";
import { BankSelector } from "@/app/components/BankSelector";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
  balance: IFormField;
  icon: IFormField;
  hideValue: IFormField;
  userId: IFormField;
}

export const AddAccountForm = () => {
  const { getCookie } = useCookies();
  const setOpenAccountModal = useSetRecoilState(accountModalAtom);
  const [icon, setIcon] = useState("");
  const [showIconList, setShowIconList] = useState(false);

  const currentIcon = useMemo(() => {
    return `/images/banks/${icon}.webp`;
  }, [icon]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const balance = (fields as unknown as IFormFields)["balance"].value;
    const hideValue = (fields as unknown as IFormFields)["hideValue"].value;
    const userId = getCookie("userId");

    await client("/account", {
      method: "POST",
      body: JSON.stringify({
        name,
        balance,
        hideValue,
        icon,
        userId,
      }),
      next: {
        tags: [TagsEnum.TAG],
      },
    });

    setOpenAccountModal(false);
  }

  function handleShowIconList() {
    setShowIconList(true);
  }

  function handleSelectIcon(iconName: string) {
    setIcon(iconName);
    setShowIconList(false);
  }

  return (
    <div className="max-w-80 w-full max-h-96 overflow-auto custom-scrollbar transition-all">
      {showIconList && (
        <BankSelector onSelect={handleSelectIcon} />
      )}

      {!showIconList && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-0.5">
          <button
            type="button"
            className="flex flex-col items-center justify-center"
            onClick={handleShowIconList}
          >
            <Icon icon={currentIcon} size="md" />
            <span className="text-sm text-gray-600 mt-1">Icon</span>
          </button>
          <input id="name" name="name" type="text" placeholder="name" />
          <input id="balance" name="balance" type="tel" placeholder="balance" />
          <label
            htmlFor="hideValue"
            className="flex items-center justify-start"
          >
            <input
              className="flex-grow-0 w-fit"
              id="hideValue"
              name="hideValue"
              type="checkbox"
            />
            <span className="flex-grow pl-4 text-gray-400 text-sm">
              hide value
            </span>
          </label>
          <button className="button" type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
};
