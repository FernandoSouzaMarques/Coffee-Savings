import { Fragment } from "react";
import { CreditCardList } from "@/app/components/credit-cards/CreditCardList";
import { HeadingWrapper } from "@/app/components/credit-cards/HeadingWrapper";
import { AddCreditCardModal } from "@/app/components/credit-cards/AddCreditCardModal";
import { client } from "@/config/client";
import { cookies } from "next/headers";
import { IAccount } from "@/types/Account.type";

async function getAccounts(userId?: string): Promise<IAccount[]> {
  const response = client(`/account?userId=${userId}`);
  return response ?? [];
}

export default async function CreditCards() {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const accounts = await getAccounts(loggedUser?.value);

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
