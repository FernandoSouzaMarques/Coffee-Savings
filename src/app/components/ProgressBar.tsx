import clsx from "clsx";
import { FC } from "react";

interface IProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: FC<IProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  const getColor = (percent: number) => {
    if (percent > 75) return "bg-error";
    if (percent > 49) return "bg-[#FF7403]";
    return "bg-success";
  };

  return (
    <div className="my-4 h-3 bg-base-400 rounded-lg w-full overflow-hidden flex">
      <span className={clsx("block w-1/2", getColor(percentage))} style={{ width: `${percentage}%` }} />
    </div>
  );
};
