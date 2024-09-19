import { CategoryListCard } from "@/app/components/categories/CategoryListCard";
import { client } from "@/config/client";

interface ISubCategories {
  id: string;
  name: string;
}

interface ICategories {
  id: string;
  name: string,
  icon: string;
  color: string;
  isExpense: boolean;
  subCategories: ISubCategories[]
}

async function getCategories() {
  const categories: ICategories[] = await client("/category");

  if (!categories) return { expenditure: [], recipe: []}

  return {
    expenditure: categories.filter((c) => c.isExpense),
    recipe: categories.filter((c) => !c.isExpense),
  }
}

export const CategoriesWrapper = async () => {
  const {
    expenditure,
    recipe
  } = await getCategories();
  return (
    <div className="grid grid-cols-2 gap-4 cnt">
      <CategoryListCard categories={expenditure} group="expenditure" />
      <CategoryListCard categories={recipe} group="recipe"/>
    </div>
  );
};
