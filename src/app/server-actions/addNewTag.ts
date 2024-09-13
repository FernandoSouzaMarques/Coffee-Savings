"use server";

import { client } from "@/config/client";
import { TagsEnum } from "@/enum/Tags";
import { revalidateTag } from "next/cache";

export async function addNewTag(payload: BodyInit) {
  await client("/tag", {
    method: "POST",
    body: payload,
    next: {
      tags: [TagsEnum.TAG],
    },
  });
  revalidateTag(TagsEnum.TAG);
}
