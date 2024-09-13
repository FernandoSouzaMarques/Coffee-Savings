"use client"

import { client } from "@/config/client";
import { TagsEnum } from "@/enum/Tags";
import { profileModalAtom } from "@/store/atoms/profileModalAtom";
import { FormEvent } from "react";
import { useSetRecoilState } from "recoil";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
  nickname: IFormField;
  password: IFormField;
}

export const NewProfileForm = () => {
  const setOpenProfileModal = useSetRecoilState(profileModalAtom);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const nickname = (fields as unknown as IFormFields)["nickname"].value;
    const password = (fields as unknown as IFormFields)["password"].value;
    const avatar = "avatar";

    await client(`/users?tag=${TagsEnum.USER}`, {
      method: "POST",
      body: JSON.stringify({ name, nickname, password, avatar }),
      next: {
        tags: [TagsEnum.USER]
      }
    })

    setOpenProfileModal(false);
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input id="name" name="name" type="text" placeholder="name" />
      <input id="nickname" name="nickname" type="text" placeholder="nickname" />
      <input id="password" name="password" type="password" placeholder="Password" />
      <button className="button" type="submit">Save</button>
    </form>
  )
}