import { AddCategoryModal } from "@/app/components/categories/AddCategoryModal";
import { CategoriesWrapper } from "@/app/components/categories/CategoriesWrapper";
import { HeadingWrapper } from "@/app/components/categories/HeadingWrapper";
import { Fragment } from "react";

export default function Categories() {
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <CategoriesWrapper />
      </div>
      <AddCategoryModal />
    </Fragment>
  );
}
