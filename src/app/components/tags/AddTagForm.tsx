"use client";

import { client } from "@/config/client";
import { FormEvent } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { tagModalAtom } from "@/store/atoms/tagModalAtom";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
}

export const AddTagForm = () => {
  const setOpenTagModal = useSetRecoilState(tagModalAtom);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;

    await client("/tag", {
      method: "POST",
      body: JSON.stringify({ name }),
      next: {
        tags: [TagsEnum.TAG]
      }
    })

    setOpenTagModal(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input id="name" name="name" type="text" placeholder="name" />
      <button type="submit">Save</button>
    </form>
  );
};
