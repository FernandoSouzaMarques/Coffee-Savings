"use client";

import { client } from "@/config/client";
import { FC, FormEvent, useMemo, useState } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { transactionModalAtom } from "@/store/atoms/transactionModalAtom";
import { useCookies } from "@/app/hooks/useCookies";
import { SelectWithIcon } from "@/app/components/SelectWithIcon";
import { Tabs } from "../Tabs";
import { IAccount } from "@/types/Account.type";
import { ICategory } from "@/types/Category.type";
import { TTransaction } from "@/types/Transaction.type";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
  icon: IFormField;
  limit: IFormField;
  closingDate: IFormField;
  expirationDate: IFormField;
  userId: IFormField;
}

interface IAddTransactionFormProps {
  accounts: IAccount[];
  categories: Record<string, ICategory[]>;
}

interface ITypesOfTransaction {
  id: TTransaction;
  name: string;
}

const typesOfTransaction: ITypesOfTransaction[] = [
  { id: "expenditure", name: "Expenditure" },
  { id: "recipe", name: "Recipe" },
  { id: "transfer", name: "Transfer" },
];

function insertCategoryPathIcon(categories: ICategory[]): ICategory[] {
  return categories.map((cat) => ({
    ...cat,
    icon: `/images/categories/${cat.icon}`,
  }));
}

function flatSubcategories(categories: ICategory[]): ICategory[] {
  const flatted = categories.reduce<ICategory[]>((acc, curr) => {
    acc.push(curr)

    if(curr.subCategories.length > 0) {
      curr.subCategories.forEach((sub) => {
        acc.push({
          ...curr,
          id: `${curr.id}-${sub.id}`,
          name: sub.name
        })
      })
    }
    return acc;
  }, []);
  return flatted;
}

export const AddTransactionForm: FC<IAddTransactionFormProps> = ({
  accounts,
  categories,
}) => {
  const { getCookie } = useCookies();
  const setOpenTransactionModal = useSetRecoilState(transactionModalAtom);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [currentTypeTransaction, setCurrentTypeTransaction] =
    useState<TTransaction>("expenditure");

  const formattedCategories = useMemo(() => {
    const group: Record<TTransaction, ICategory[]> = {
      expenditure: flatSubcategories(
        insertCategoryPathIcon(categories.expenditure)
      ),
      recipe: flatSubcategories(insertCategoryPathIcon(categories.recipe)),
      transfer: [],
    };

    return group[currentTypeTransaction];
  }, [categories, currentTypeTransaction]);

  function getDate(day: string) {
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      Number(day)
    ).toISOString();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const limit = (fields as unknown as IFormFields)["limit"].value;
    const closingDate = (fields as unknown as IFormFields)["closingDate"].value;
    const expirationDate = (fields as unknown as IFormFields)["expirationDate"]
      .value;

    const userId = getCookie("userId");
    const accountId = selectedAccount;

    await client("/credit-card", {
      method: "POST",
      body: JSON.stringify({
        name,
        limit,
        closingDate: getDate(closingDate),
        expirationDate: getDate(expirationDate),
        userId,
        accountId,
      }),
      next: {
        tags: [TagsEnum.TAG],
      },
    });

    setOpenTransactionModal(false);
  }

  function handleChangeTypeTransaction(id: string) {
    const transactionTypeId = typesOfTransaction.find((i) => i.id === id)?.id;
    if (!transactionTypeId) return;

    setCurrentTypeTransaction(transactionTypeId);
  }

  function handleSelectAccount(selected: string) {
    setSelectedAccount(selected);
  }

  function handleSelectCategory(selected: string) {
    console.log(selected);
  }

  function getFormattedAccount() {
    return accounts.map((account) => ({
      ...account,
      icon: `/images/banks/${account.icon}.webp`,
    }));
  }

  return (
    <div className="max-w-80 w-full max-h-[31.25rem] overflow-auto custom-scrollbar transition-all">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-0.5">
        <Tabs
          onChange={handleChangeTypeTransaction}
          items={typesOfTransaction}
        />
        <input
          autoComplete="value"
          id="value"
          name="value"
          type="tel"
          placeholder="value"
        />
        <input
          autoComplete="description"
          id="description"
          name="description"
          type="text"
          placeholder="description"
        />
        <SelectWithIcon
          placeholder="paid with"
          onChange={handleSelectAccount}
          list={getFormattedAccount()}
        />
        <SelectWithIcon
          placeholder="category"
          onChange={handleSelectCategory}
          list={formattedCategories}
        />
        <input
          autoComplete="date"
          id="date"
          name="Date"
          type="date"
          placeholder="description"
        />
        <button className="button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
