import { Fragment } from "react";
import { CreditCardList } from "@/app/components/credit-cards/CreditCardList";
import { HeadingWrapper } from "@/app/components/credit-cards/HeadingWrapper";
import { AddCreditCardModal } from "@/app/components/credit-cards/AddCreditCardModal";
import { client } from "@/config/client";


interface IAccount {
  id: string;
  name: string;
  balance: number;
  icon: string;
  hideValue: boolean;
}


async function getAccounts(): Promise<IAccount[]> {
  const response = client("/account");
  return response ?? [];
}

export default async function CreditCards() {
  const accounts = await getAccounts();
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <CreditCardList />
      </div>
      <AddCreditCardModal accounts={accounts} />
    </Fragment>
  );
}
