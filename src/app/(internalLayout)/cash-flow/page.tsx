import { AddTransactionModal } from "@/app/components/cash-flow/AddTransactionModal";
import { HeadingWrapper } from "@/app/components/cash-flow/HeadingWrapper";
import { client } from "@/config/client";
import { cookies } from "next/headers";
import { Fragment } from "react";

interface IAccount {
  id: string;
  name: string;
  balance: number;
  icon: string;
  hideValue: boolean;
}

async function getAccounts(userId?: string): Promise<IAccount[]> {
  const response = client(`/account?userId=${userId}`);
  return response ?? [];
}


export default async function CashFlow() {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const accounts = await getAccounts(loggedUser?.value);

  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <p>content...</p>
      </div>
      <AddTransactionModal accounts={accounts} />
    </Fragment>
  );
}
