import React, { useState } from "react";

import arrowTop from '../assets/img/arrow-top.svg';
import arrowDown from '../assets/img/arrow-down.svg';

export const Sort: React.FC = () => {
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = ["популярности", "цене", "алфавиту"];

  return (
    <div className="sort">
      <div className="sort__label">
        <img src={isVisiblePopup ? arrowDown : arrowTop}/>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {list[selected]}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className={selected === index ? "active" : ""}
                onClick={() => {
                  setSelected(index);
                  setIsVisiblePopup(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
