"use client";

import { FC, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface IItem {
  id: string;
  icon: string;
  name: string;
}

interface ISelectData {
  id: string,
  name: string,
  icon: string,
  hideValue: boolean;
}

interface ISelectWithIconProps {
  list: IItem[];
  onChange: (id: string) => void;
}

export const SelectWithIcon: FC<ISelectWithIconProps> = ({ list, onChange }) => {
  const [selected, setSelected] = useState<IItem | null>(null);

  function handleChange(item: ISelectData) {
    setSelected(item)
    onChange(item.id)
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-base-500 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-info sm:text-sm sm:leading-6">
          <span className="flex items-center min-h-8">
            {selected?.icon && (
              <picture>
                <img
                  alt=""
                  src={selected?.icon}
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
              </picture>
            )}
            <span
              className={clsx(
                "ml-3 block truncate text-sm",
                !!selected?.name ? "text-white" : "text-gray-600"
              )}
            >
              {selected?.name ?? "Selecione"}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-base-500 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {list.map((item) => (
            <ListboxOption
              key={item.id}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-info data-[focus]:text-white"
            >
              <div className="flex items-center">
                <picture>
                  <img
                    alt=""
                    src={item.icon}
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                </picture>
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold text-white">
                  {item.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
