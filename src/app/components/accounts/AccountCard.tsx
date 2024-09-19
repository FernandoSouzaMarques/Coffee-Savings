"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import clsx from "clsx";
import { FC } from "react";
import { Icon } from "@/app/components/Icon";

interface IAccountCardProps {
  name: string;
  icon: string;
  balance: number;
}

export const AccountCard: FC<IAccountCardProps> = ({
  name,
  icon,
  balance,
}): JSX.Element => {
  function getStyleByBalance(): string {
    if (balance < 0) return "text-error";
    return "text-info";
  }

  function handleClick() {
    console.log("edit account")
  }

  return (
    <div role="button" onClick={handleClick} className="flex flex-col paper">
      <div className="flex items-center space-x-4">
        <Icon icon={`/images/banks/${icon}.webp`} size="md" />
        <p className="font-medium text-xl">{name}</p>
      </div>
      <span className="divider" />
      <p>
        <span className="text-detail block">Current balance</span>
        <strong className={clsx("font-bold text-xl", getStyleByBalance())}>
          {formatCurrency(balance)}
        </strong>
      </p>
    </div>
  );
};
