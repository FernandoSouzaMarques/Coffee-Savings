import { AddAccountModal } from "@/app/components/accounts/AddAccountModal";
import { HeadingWrapper } from "@/app/components/accounts/HeadingWrapper";
import { ListAccounts } from "@/app/components/accounts/ListAccounts";
import { Fragment } from "react";

export default function Account() {
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10 cnt">
        <ListAccounts />
      </div>
      <AddAccountModal />
    </Fragment>
  );
}
