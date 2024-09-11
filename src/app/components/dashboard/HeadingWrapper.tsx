"use client";

import { FC } from "react";
import { format, getHours } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";

interface IHeadingWrapperProps {
  name: string;
}

export const HeadingWrapper: FC<IHeadingWrapperProps> = ({ name }) => {
  const today = new Date();

  function getTitle() {
    const partOfDay = getPartOfDay();
    return `${partOfDay}, ${name}`;
  }

  function action() {
    console.log("Action");
  }

  function getFormattedDate() {
    return format(today, "eeee, MMM dd");
  }

  function getPartOfDay() {
    const hours = getHours(today);
    if (hours >= 0 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 18) return "Afternoon";
    return "Evening";
  }

  return (
    <Heading
      title={getTitle()}
      description={getFormattedDate()}
      label="Add"
      icon={<PlusIcon className="w-5" />}
      action={action}
    />
  );
};
