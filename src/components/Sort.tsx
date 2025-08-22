import React, { useState } from "react";

import arrowTop from "../assets/img/arrow-top.svg";
import arrowDown from "../assets/img/arrow-down.svg";
import type { SortType } from "../types/SortType";

type Props = {
  sortType: SortType;
  onChangeSortType: (sortParams: SortType) => void;
};

export const Sort: React.FC<Props> = ({ sortType, onChangeSortType }) => {
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const list: SortType[] = [
    { name: "популярности (DESC)", sortProperty: "rating" },
    { name: "популярности (ASC)", sortProperty: "-rating" },
    { name: "цене (DESC)", sortProperty: "price" },
    { name: "цене (ASC)", sortProperty: "-price" },
    { name: "алфавиту (DESC)", sortProperty: "title" },
    { name: "алфавиту (ASC)", sortProperty: "-title" },
  ];

  return (
    <div className="sort">
      <div className="sort__label">
        <img src={isVisiblePopup ? arrowDown : arrowTop} />
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {sortType.name}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className={sortType.sortProperty === item.sortProperty ? "active" : ""}
                onClick={() => {
                  onChangeSortType(item);
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
};
