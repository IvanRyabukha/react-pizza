import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as filterAction from "../redux/slice/filterSlice";

export const Categories: React.FC = () => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const dispatch = useAppDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => dispatch(filterAction.setCategoryId(index))}
            className={categoryId === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
