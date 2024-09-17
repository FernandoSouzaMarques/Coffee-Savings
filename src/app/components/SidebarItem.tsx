"use client";

import { PagesEnum } from "@/enum/Pages";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface ISidebarItemProps {
  label: string;
  icon: JSX.Element;
  url: PagesEnum;
}

export const SidebarItem: FC<ISidebarItemProps> = ({ icon, label, url }) => {
  const pathname = usePathname();
  function hasActive(page: PagesEnum) {
    return page === pathname;
  }
  return (
    <Link
      href={url}
      className={clsx(
        "flex items-center space-x-4 p-4 rounded-lg transition-colors hover:bg-success-dark/50",
        {
          "bg-success-dark": hasActive(url),
        }
      )}
    >
      <span>{icon}</span>
      <p>{label}</p>
    </Link>
  );
};
