"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import clsx from "clsx";
import { FC } from "react";
import { Icon } from "@/app/components/Icon";
import { getOrdinalSuffix } from "@/utils/getOrdinalSuffix";
import { ProgressBar } from "@/app/components/ProgressBar";

interface ICreditCardCardProps {
  id: number;
  name: string;
  icon: string;
  closingDate: string;
  expirationDate: string;
  currentInvoice: number;
  limit: number;
  accountId: 1;
}

export const CreditCardCard: FC<ICreditCardCardProps> = ({
  id,
  name,
  icon,
  closingDate,
  expirationDate,
  currentInvoice,
  limit,
  accountId,
}): JSX.Element => {
  function getStyleByInvoice(): string {
    return "bg-success";
  }

  function getClosingAndExpirationDate() {
    const closeDate = new Date(closingDate).getDate();
    const expireDate = new Date(expirationDate).getDate();
    return `Closes on the ${getOrdinalSuffix(
      closeDate
    )} - Expires on the ${getOrdinalSuffix(expireDate)}`;
  }

  function handleClick() {
    console.log("edit credit card");
  }


  return (
    <div role="button" onClick={handleClick} className="flex flex-col paper">
      <div className="flex items-center space-x-4">
        <Icon icon={`/images/banks/${icon}.webp`} size="md" />
        <div>
          <p className="font-medium text-xl">{name}</p>
          <p className="text-base text-detail">
            {getClosingAndExpirationDate()}
          </p>
        </div>
      </div>
      <ProgressBar current={currentInvoice} total={limit} />
      <div className="flex items-center justify-between">
        <p>
          <span className="text-detail block">Current bill</span>
          <strong className={clsx("font-bold text-xl")}>
            {formatCurrency(currentInvoice)}
          </strong>
        </p>
        <p className="text-right">
          <span className="text-detail block">Available</span>
          <strong className={clsx("font-bold text-xl")}>
            {formatCurrency(limit)}
          </strong>
        </p>
      </div>
    </div>
  );
};
