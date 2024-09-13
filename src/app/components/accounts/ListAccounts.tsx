import { client } from "@/config/client";
import { AccountCard } from "@/app/components/accounts/AccountCard";

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

export const ListAccounts = async () => {
  const accounts = await getAccounts();

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
