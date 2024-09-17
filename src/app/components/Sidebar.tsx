"use server";

import { PagesEnum } from "@/enum/Pages";
import {
  Squares2X2Icon,
  BanknotesIcon,
  CreditCardIcon,
  BookmarkIcon,
  TagIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Icon } from "@/app/components/Icon";
import { SidebarItem } from "./SidebarItem";
import { client } from "@/config/client";
import { cookies } from "next/headers";

const pages = [
  {
    label: "Dashboard",
    icon: <Squares2X2Icon className="w-6" />,
    url: PagesEnum.DASHBOARD,
  },
  {
    label: "Accounts",
    icon: <BanknotesIcon className="w-6" />,
    url: PagesEnum.ACCOUNTS,
  },
  {
    label: "Credit cards",
    icon: <CreditCardIcon className="w-6" />,
    url: PagesEnum.CREDIT_CARD,
  },
  {
    label: "Categories",
    icon: <BookmarkIcon className="w-6" />,
    url: PagesEnum.CATEGORIES,
  },
  {
    label: "Tags",
    icon: <TagIcon className="w-6" />,
    url: PagesEnum.TAGS,
  },
  {
    label: "Cash flow",
    icon: <ArrowsRightLeftIcon className="w-6" />,
    url: PagesEnum.CASH_FLOW,
  },
  {
    label: "Reports",
    icon: <ChartBarIcon className="w-6" />,
    url: PagesEnum.REPORTS,
  },
  {
    label: "Spending limits",
    icon: <AdjustmentsHorizontalIcon className="w-6" />,
    url: PagesEnum.SPENDING_LIMITS,
  },
];

const actions = [
  {
    label: "Settings",
    icon: <WrenchScrewdriverIcon className="w-6" />,
    url: PagesEnum.SETTINGS,
  },
  {
    label: "Change Profile",
    icon: <UsersIcon className="w-6" />,
    url: PagesEnum.HOME,
  },
];

async function getAvatar(id?: string): Promise<string | undefined> {
  if (!id) return;
  const user = await client(`/users?id=${id}`);
  return user.avatar;
}
export const Sidebar = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const loggedUser = cookieStore.get("userId");
  const avatar = await getAvatar(loggedUser?.value);

  return (
    <div className="bg-base-100 p-10 flex flex-col min-h-screen shadow-lg flex-shrink-0">
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-4">
          <p className="text-2xl">Coffee Savings</p>
          <img src="/images/logo.svg" alt="Logo coffe savings" />
        </div>
        <Icon icon={`/images/profiles/${avatar}.jpg`} size="sm" />
      </div>

      <nav className="flex-grow mt-14">
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page.label}>
              <SidebarItem {...page} />
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mt-14">
        <ul className="space-y-2">
          {actions.map((page) => (
            <li key={page.label}>
              <SidebarItem {...page} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
