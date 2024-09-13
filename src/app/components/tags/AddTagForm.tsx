"use client";

import { FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import { tagModalAtom } from "@/store/atoms/tagModalAtom";
import { addNewTag } from "@/app/server-actions/addNewTag";

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

    await addNewTag(JSON.stringify({ name }))
    setOpenTagModal(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input id="name" name="name" type="text" placeholder="name" />
      <button className="button" type="submit">Save</button>
    </form>
  );
};
