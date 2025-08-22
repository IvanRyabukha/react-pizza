import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import type { Pizza } from "../types/Pizza";
import type { SortType } from "../types/SortType";

export const Home = () => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortType>({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://68a7506d639c6a54e9a1aeba.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then(setItems)
      .finally(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id: number) => setCategoryId(id)}
        />
        <Sort
          sortType={sortType}
          onChangeSortType={(sortParams: SortType) => setSortType(sortParams)}
        />
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
