import { client } from "@/config/client";
import { CreditCardCard } from "@/app/components/credit-cards/CreditCardCard";
import { cookies } from "next/headers";
import { ICreditCard } from "@/types/CreditCard.type";

async function getCreditCards(userId?: string): Promise<ICreditCard[]> {
  const response = client(`/credit-card?userId=${userId}`);
  return response ?? [];
}

export const CreditCardList = async () => {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const creditCards = await getCreditCards(loggedUser?.value);

  return (
    <ul className="grid gap-4">
      {creditCards.map((creditCard) => (
        <li key={creditCard.id}>
          <CreditCardCard {...creditCard} />
        </li>
      ))}
    </ul>
  );
};
