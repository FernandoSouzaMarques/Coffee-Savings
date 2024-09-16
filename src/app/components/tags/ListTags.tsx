"use server";

import { client } from "@/config/client";
import { PencilSquareIcon, TagIcon } from "@heroicons/react/24/solid";

interface ITag {
  id: string;
  name: string;
}

async function getTags(): Promise<ITag[]> {
  const response = client("/tag");
  return response ?? [];
}

export const ListTags = async () => {
  const tags = await getTags();
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag.id}
        >
          <button className="bg-base-100 px-4 py-2 rounded-lg flex items-center space-x-2">
            <TagIcon className="w-5 text-base-300" />
            <p>{tag.name}</p>
            <PencilSquareIcon className="w-4 text-white" />
          </button>
        </li>
      ))}
    </ul>
  );
};
