import { Fragment } from "react";
import { CreditCardList } from "@/app/components/credit-cards/CreditCardList";
import { HeadingWrapper } from "@/app/components/credit-cards/HeadingWrapper";

export default function CreditCards() {
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <CreditCardList />
      </div>
    </Fragment>
  );
}
