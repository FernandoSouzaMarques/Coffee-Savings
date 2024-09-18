import clsx from "clsx";
import { FC } from "react";
import { Icon } from "../Icon";

interface ICategory {
  id: string;
  name: string;
  subCategories: any[];
}

interface CategoryListCardProps {
  group: "expenditure" | "recipe";
  categories: ICategory[];
}

export const CategoryListCard: FC<CategoryListCardProps> = ({
  group,
  categories,
}) => {
  function getGroupTitle() {
    const labelsByGroup = {
      expenditure: "Expenditure",
      recipe: "Recipe",
    };

    return labelsByGroup[group];
  }

  function getGroupStyle() {
    const styleByGroup = {
      expenditure: "text-error",
      recipe: "text-success",
    };

    return styleByGroup[group];
  }

  return (
    <div className="paper">
      <h2 className={clsx("font-medium text-2xl", getGroupStyle())}>
        {getGroupTitle()}
      </h2>
      <div className="divider" />
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="py-1 last:pb-0 first:pt-0">
            <div className="flex items-center">
              <Icon icon="" size="sm" />
              <p className="ml-4">{cat.name}</p>
            </div>
            {cat.subCategories && (
              <ul className="ml-10">
                {cat.subCategories.map((sub) => (
                  <li key={sub.id} className="flex items-center py-1">
                    <span className="block rounded-full w-2 aspect-square bg-info" />
                    <p className="ml-2">{sub.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
