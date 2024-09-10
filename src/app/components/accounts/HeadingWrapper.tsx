"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";

export const HeadingWrapper = () => {
  function action() {
    console.log("Action");
  }
  return (
    <Heading
      title="Accounts"
      description="Here are all your accounts. You can edit them and adjust their balances."
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={action}
    />
  );
};
