import React, { useEffect, useRef, useState } from "react";

import arrowTop from "../assets/img/arrow-top.svg";
import arrowDown from "../assets/img/arrow-down.svg";
import type { SortType } from "../types/SortType";
import * as filterAction from "../redux/slice/filterSlice";
import { useAppDispatch } from "../redux/hooks";

export const list: SortType[] = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

type SortProps = {
  value: SortType;
};

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsVisiblePopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <img src={isVisiblePopup ? arrowDown : arrowTop} />
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {value.name}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className={
                  value.sortProperty === item.sortProperty ? "active" : ""
                }
                onClick={() => {
                  dispatch(filterAction.setSort(item));
                  setIsVisiblePopup(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
