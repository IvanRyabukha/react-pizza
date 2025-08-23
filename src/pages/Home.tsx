import React, { useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import type { Pizza } from "../types/Pizza";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useAppSelector } from "../redux/hooks";

export const Home: React.FC = () => {
  const { inputQuery } = useContext(SearchContext);
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = inputQuery ? `&search=${inputQuery}` : "";

    fetch(
      `https://68a7506d639c6a54e9a1aeba.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then(setItems)
      .finally(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, inputQuery, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(page: number) => setCurrentPage(page)} />
    </div>
  );
};
