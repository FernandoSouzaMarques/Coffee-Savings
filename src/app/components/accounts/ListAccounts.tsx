import { client } from "@/config/client";
import { AccountCard } from "@/app/components/accounts/AccountCard";
import { cookies } from "next/headers";
import { IAccount } from "@/types/Account.type";

async function getAccounts(userId?: string): Promise<IAccount[]> {
  const response = client(`/account?userId=${userId}`);
  return response ?? [];
}

export const ListAccounts = async () => {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const accounts = await getAccounts(loggedUser?.value);

  return (
    <ul className="grid gap-4">
      {accounts.map((account) => (
        <li key={account.id}>
          <AccountCard {...account} />
        </li>
      ))}
    </ul>
  );
};
