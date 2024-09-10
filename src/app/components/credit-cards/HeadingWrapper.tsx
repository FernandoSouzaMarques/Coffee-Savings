"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";

export const HeadingWrapper = () => {
  function action() {
    console.log("Action");
  }
  return (
    <Heading
      title="Credit cards"
      description="Here are your cards."
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={action}
    />
  );
};
