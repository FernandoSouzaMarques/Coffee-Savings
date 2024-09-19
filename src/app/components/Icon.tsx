import clsx from "clsx";
import { FC } from "react";

type TSizeOptions = "sm" | "md" | "lg";

interface IIconProps {
  icon: string;
  bgColor?: string;
  applyPadding?: boolean;
  size: TSizeOptions;
}

export const Icon: FC<IIconProps> = ({ icon, size, applyPadding, bgColor }) => {
  function getSize() {
    const classesBySize = {
      sm: "w-10",
      md: "w-14",
      lg: "w-20",
    };

    return classesBySize[size];
  }
  return (
    <picture
      className={clsx(
        "aspect-square block rounded-full overflow-hidden",
        {"p-1.5" : applyPadding,  "bg-base-500 ring-info/20 ring-2 ring-inset" : !bgColor},
        getSize()
      )}
      style={{
        background: bgColor ?? ""
      }}
    >
      <img src={icon} alt="" className="object-cover object-center" />
    </picture>
  );
};
