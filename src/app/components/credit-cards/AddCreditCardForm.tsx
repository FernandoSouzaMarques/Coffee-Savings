"use client";

import { client } from "@/config/client";
import { FC, FormEvent, useMemo, useState } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { creditCardModalAtom } from "@/store/atoms/creditCardModalAtom";
import { useCookies } from "@/app/hooks/useCookies";
import { Icon } from "@/app/components/Icon";
import { BankSelector } from "@/app/components/BankSelector";
import { SelectWithIcon } from "@/app/components/SelectWithIcon";
import { IAccount } from "@/types/Account.type";

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

interface IAddCreditCardFormProps {
  accounts: IAccount[];
}

export const AddCreditCardForm: FC<IAddCreditCardFormProps> = ({
  accounts,
}) => {
  const { getCookie } = useCookies();
  const setOpenCreditCardModal = useSetRecoilState(creditCardModalAtom);
  const [icon, setIcon] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showIconList, setShowIconList] = useState(false);

  const currentIcon = useMemo(() => {
    return `/images/banks/${icon}.webp`;
  }, [icon]);

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
        icon,
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

    setOpenCreditCardModal(false);
  }

  function handleShowIconList() {
    setShowIconList(true);
  }

  function handleSelectIcon(iconName: string) {
    setIcon(iconName);
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
      {showIconList && <BankSelector onSelect={handleSelectIcon} />}

      {!showIconList && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 px-0.5"
        >
          <button
            type="button"
            className="flex flex-col items-center justify-center"
            onClick={handleShowIconList}
          >
            <Icon icon={currentIcon} size="md" />
            <span className="text-sm text-gray-600 mt-1">Icon</span>
          </button>
          <input autoComplete="accountName" id="name" name="name" type="text" placeholder="name" />
          <input autoComplete="limit" id="limit" name="limit" type="tel" placeholder="limit" />
          <div className="grid grid-cols-2 gap-4">
            <input
              autoComplete="closingDate"
              id="closingDate"
              name="closingDate"
              type="tel"
              placeholder="closing date"
            />
            <input
              autoComplete="expirationDate"
              id="expirationDate"
              name="expirationDate"
              type="tel"
              placeholder="expiration date"
            />
          </div>

          <SelectWithIcon onChange={handleSelectAccount} list={getFormattedAccount()} />

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
      )}
    </div>
  );
};
