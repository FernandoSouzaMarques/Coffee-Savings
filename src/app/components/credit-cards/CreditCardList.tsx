import { client } from "@/config/client";
import { CreditCardCard } from "@/app/components/credit-cards/CreditCardCard";

interface ICreditCard {
  id: number,
  name: string,
  icon: string,
  closingDate: string,
  expirationDate: string,
  currentInvoice: number,
  limit: number,
  accountId: 1
}

async function getCreditCards(): Promise<ICreditCard[]> {
  const response = client("/credit-card");
  return response ?? [];
}

export const CreditCardList = async () => {
  const creditCards = await getCreditCards();

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
