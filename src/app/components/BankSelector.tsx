import { bankAgencies } from "@/app/data/bank-agencies";
import { FC } from "react";

interface IBankSelectorProps {
  onSelect: (icon: string) => void;
}

export const BankSelector: FC<IBankSelectorProps> = ({ onSelect }) => {
  function handleSelectIcon(icon: string) {
    onSelect(icon);
  }

  return (
    <ul className="w-fit grid grid-cols-3 gap-4">
      {bankAgencies.map((bank) => (
        <li key={`profile-${bank.name}`}>
          <button
            type="button"
            className="rounded-full overflow-hidden bg-white/20 w-full max-w-16 aspect-square"
            onClick={() => handleSelectIcon(bank.icon)}
          >
            <picture className="flex items-center justify-center">
              <img
                className="aspect-square w-full object-cover object-center"
                src={`/images/banks/${bank.icon}.webp`}
                alt=""
              />
            </picture>
          </button>
        </li>
      ))}
    </ul>
  );
};
