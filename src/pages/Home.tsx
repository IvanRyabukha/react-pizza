import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import type { Pizza } from "../types/Pizza";

export const Home = () => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://68a7506d639c6a54e9a1aeba.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then(setItems)
      .finally(() => {
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};
