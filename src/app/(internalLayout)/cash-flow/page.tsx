import { AddTransactionModal } from "@/app/components/cash-flow/AddTransactionModal";
import { HeadingWrapper } from "@/app/components/cash-flow/HeadingWrapper";
import { client } from "@/config/client";
import { IAccount } from "@/types/Account.type";
import { ICategory } from "@/types/Category.type";
import { cookies } from "next/headers";
import { Fragment } from "react";

async function getAccounts(userId?: string): Promise<IAccount[]> {
  const response = client(`/account?userId=${userId}`);
  return response ?? [];
}

async function getCategories(): Promise<Record<string, ICategory[]>> {
  const categories: ICategory[] = await client("/category");

  if (!categories) return { expenditure: [], recipe: []}

  return {
    expenditure: categories.filter((c) => c.isExpense),
    recipe: categories.filter((c) => !c.isExpense),
  }
}

export default async function CashFlow() {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const accounts = await getAccounts(loggedUser?.value);
  const categories = await getCategories();

  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <p>content...</p>
      </div>
      <AddTransactionModal categories={categories} accounts={accounts} />
    </Fragment>
  );
}
