export interface ISubCategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string,
  icon: string;
  color: string;
  isExpense: boolean;
  subCategories: ISubCategory[]
}