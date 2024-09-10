"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";

export const HeadingWrapper = () => {
  function action() {
    console.log("Action");
  }
  return (
    <Heading
      title="Categories"
      description="Organize your postings with categories"
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={action}
    />
  );
};
