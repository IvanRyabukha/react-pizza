import React, { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";
import type { Pizza } from "./types/Pizza";

import "./scss/app.scss";

const App: React.FC = () => {
  const [items, setItems] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("https://68a7506d639c6a54e9a1aeba.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then(setItems);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
