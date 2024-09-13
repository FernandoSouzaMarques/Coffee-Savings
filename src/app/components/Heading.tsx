"use client";

import { FC, ReactNode } from "react";

interface IHeadingProps {
  title: string;
  description?: string;
  label?: string;
  icon?: ReactNode;
  action?: () => void;
}

export const Heading: FC<IHeadingProps> = ({
  title,
  description,
  label,
  icon,
  action,
}): JSX.Element => {
  return (
    <div className="flex items-start justify-between w-full">
      <div>
        <h1 className="text-3xl mb-4">{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {label && (
        <button
          className="button h-fit"
          onClick={action}
        >
          {icon}
          <span className="inline-block">{label}</span>
        </button>
      )}
    </div>
  );
};
