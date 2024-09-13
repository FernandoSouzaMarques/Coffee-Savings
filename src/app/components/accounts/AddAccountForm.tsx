"use client";

import { client } from "@/config/client";
import { FormEvent } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { accountModalAtom } from "@/store/atoms/accountModalAtom";
import { useCookies } from "@/app/hooks/useCookies";

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
  const {getCookie} = useCookies();
  const setOpenAccountModal = useSetRecoilState(accountModalAtom);

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
        icon: "icon",
        hideValue,
        userId
      }),
      next: {
        tags: [TagsEnum.TAG]
      }
    })

    setOpenAccountModal(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input id="name" name="name" type="text" placeholder="name" />
      <input id="balance" name="balance" type="tel" placeholder="balance" />
      <label htmlFor="hideValue" className="flex items-center">
        <input id="hideValue" name="hideValue" type="checkbox" />
        <span>hide value</span>
      </label>
      <button className="button" type="submit">Save</button>
    </form>
  );
};
