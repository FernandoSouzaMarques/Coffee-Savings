"use client";

import { client } from "@/config/client";
import { FC, FormEvent, useMemo, useState } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { transactionModalAtom } from "@/store/atoms/transactionModalAtom";
import { useCookies } from "@/app/hooks/useCookies";
import { SelectWithIcon } from "@/app/components/SelectWithIcon";
import { Tabs } from "../Tabs";

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

interface IAccount {
  id: string;
  name: string;
  icon: string;
}

interface IAddTransactionFormProps {
  accounts: IAccount[];
}

export const AddTransactionForm: FC<IAddTransactionFormProps> = ({
  accounts,
}) => {
  const { getCookie } = useCookies();
  const setOpenTransactionModal = useSetRecoilState(transactionModalAtom);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showIconList, setShowIconList] = useState(false);

  function getDate(day: string) {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), Number(day)).toISOString()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const limit = (fields as unknown as IFormFields)["limit"].value;
    const closingDate = (fields as unknown as IFormFields)["closingDate"].value;
    const expirationDate = (fields as unknown as IFormFields)["expirationDate"].value;

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

  function handleShowIconList() {
    setShowIconList(true);
  }

  function handleSelectIcon(iconName: string) {
    setShowIconList(false);
  }

  function handleSelectAccount(selected: string) {
    setSelectedAccount(selected);
  }

  function getFormattedAccount() {
    return accounts.map((account) => ({
      ...account,
      icon: `/images/banks/${account.icon}.webp`,
    }))
  }

  return (
    <div className="max-w-80 w-full max-h-[31.25rem] overflow-auto custom-scrollbar transition-all">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 px-0.5"
      >
        <Tabs items={[
          {name: "Expenditure"},
          {name: "Recipe"},
          {name: "Transfer"},
        ]} />
        <input autoComplete="value" id="value" name="value" type="tel" placeholder="value" />
        <input autoComplete="description" id="description" name="description" type="text" placeholder="description" />
        <SelectWithIcon placeholder="paid with" onChange={handleSelectAccount} list={getFormattedAccount()} />

        <p className="flex-grow text-gray-400 text-sm bg-base-500 p-2 border-l-4 border-info leading-none opacity-80">
          <small>
            Select the bank account that will be used to pay the bill for this
            card. Change at any time
          </small>
        </p>
        <button className="button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
