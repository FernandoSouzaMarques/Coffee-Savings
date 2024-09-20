"use client";

import { client } from "@/config/client";
import { FormEvent, useMemo, useState } from "react";
import { TagsEnum } from "@/enum/Tags";
import { useSetRecoilState } from "recoil";
import { categoryModalAtom } from "@/store/atoms/categoryModalAtom";
import { Icon } from "@/app/components/Icon";
import { icons, colors } from "@/app/data/categories";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
  categoryType: IFormField;
  icon: IFormField;
}

export const AddCategoryForm = () => {
  const setOpenCategoryModal = useSetRecoilState(categoryModalAtom);
  const [icon, setIcon] = useState("");
  const [currentBg, setCurrentBg] = useState("");
  const [showIconList, setShowIconList] = useState(false);

  const currentIcon = useMemo(() => {
    return `/images/categories/${icon}`;
  }, [icon]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const categoryType = (fields as unknown as IFormFields)["categoryType"].value;

    const isExpense = categoryType === "expenditure";
    const color = currentBg;

    await client("/category", {
      method: "POST",
      body: JSON.stringify({
        name,
        isExpense,
        color,
        icon,
      }),
      next: {
        tags: [TagsEnum.TAG],
      },
    });

    setOpenCategoryModal(false);
  }

  function handleShowIconList() {
    setShowIconList(true);
  }

  function handleSelectIcon(iconName: string) {
    setIcon(iconName);
    setShowIconList(false);
  }

  function handleSelectColor(color: string) {
    setCurrentBg(color);
  }

  return (
    <div className="max-w-80 w-full max-h-96 overflow-auto custom-scrollbar transition-all">
      {showIconList && (
        <div>
          <div>
            <p className="text-gray-400 text-sm">Select a color</p>
            <ul className="grid grid-cols-10 gap-2 mt-2">
              {colors.map((color) => (
              <li key={color}>
                <button className="" onClick={() => handleSelectColor(color)}>
                  <span className="block w-5 aspect-square rounded-full" style={{background: color}}/>
                </button>
              </li>
              ))}
              <li className="relative">
                <input className="absolute inset-0 z-10 opacity-0" onChange={(e) => handleSelectColor(e.target.value)} type="color" />
                <picture className="w-5 block aspect-square rounded-full overflow-hidden">
                  <img className="w-full object-cover object-center" src="/images/choose-color.png" alt="" />
                </picture>
              </li>
            </ul>
          </div>
          <p className="text-gray-400 text-sm mt-4">Select a icon</p>
          <ul className="w-full grid grid-cols-3 gap-4 mt-4">
            {icons.map((category) => (
              <li key={`category-${category}`}>
                <button
                  type="button"
                  className="rounded-full overflow-hidden bg-white/20 w-full max-w-20 aspect-square"
                  onClick={() => handleSelectIcon(category)}
                >
                  <picture className="p-2 flex items-center justify-center" style={{background: currentBg ?? ""}}>
                    <img
                      className="aspect-square w-full object-cover object-center"
                      src={`/images/categories/${category}`}
                      alt=""
                    />
                  </picture>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!showIconList && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 px-0.5"
        >
          <button
            type="button"
            className="flex flex-col items-center justify-center"
            onClick={handleShowIconList}
          >
            <Icon applyPadding bgColor={currentBg} icon={currentIcon} size="md" />
            <span className="text-sm text-gray-600 mt-1">Icon</span>
          </button>
          <div className="flex items-center space-x-4">
            <label
              className="flex items-center space-x-2"
              htmlFor="typeExpenditure"
            >
              <input
                required
                id="typeExpenditure"
                type="radio"
                name="categoryType"
                value="expenditure"
                className="accent-error"
              />
              <span className="flex-grow text-gray-400 text-sm">
                Expenditure
              </span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="typeRecipe">
              <input
                required
                id="typeRecipe"
                type="radio"
                name="categoryType"
                value="recipe"
                className="accent-success"
              />
              <span className="flex-grow text-gray-400 text-sm">Recipe</span>
            </label>
          </div>
          <input id="name" name="name" type="text" placeholder="name" />

          <p className="flex-grow text-gray-400 text-sm bg-base-500 p-2 border-l-4 border-info leading-none opacity-80">
            <small>
              To create a sub-category, first create a category and then edit it
              to add
            </small>
          </p>
          <button className="button" type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
};
