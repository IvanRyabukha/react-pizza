import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as filterAction from "../redux/slice/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = React.memo(() => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const dispatch = useAppDispatch();

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
});
