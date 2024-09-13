import clsx from "clsx";
import { FC } from "react";

type TSizeOptions = "sm" | "md" | "lg";

interface IIconProps {
  icon: string;
  size: TSizeOptions;
}

export const Icon: FC<IIconProps> = ({ icon, size }) => {
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
        "aspect-square block bg-base-500 rounded-full overflow-hidden ring-info/20 ring-2 ring-inset",
        getSize()
      )}
    >
      <img src={icon} alt="" className="object-cover object-center" />
    </picture>
  );
};
