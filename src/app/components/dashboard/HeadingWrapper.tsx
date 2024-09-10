"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Heading } from "@/app/components/Heading";
import { format, getHours } from "date-fns";

const profile = "John Doe";

export const HeadingWrapper = () => {
  const today = new Date();

  function getTitle() {
    const partOfDay = getPartOfDay();
    return `${partOfDay}, ${profile}`;
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
