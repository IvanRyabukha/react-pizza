import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { Categories } from "../components/Categories";
import { list, Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import type { Pizza } from "../types/Pizza";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import * as filterAction from "../redux/slice/filterSlice";
import type { SortType } from "../types/SortType";

export const Home: React.FC = () => {
  const { inputQuery } = useContext(SearchContext);
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort);
  const currentPage = useAppSelector((state) => state.filter.currentPage);

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = inputQuery ? `&search=${inputQuery}` : "";

    axios
      .get(
        `https://68a7506d639c6a54e9a1aeba.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Если изменили параметры и был первый рендре 
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем параметры ЮРЛ и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(
        (option) => option.sortProperty === params.sortProperty
      );

      dispatch(
        filterAction.setFilters({
          sort: sort as SortType,
          categoryId: params.categoryId as string,
          currentPage: params.currentPage as string,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендре, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, inputQuery, currentPage]);

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
      <Pagination />
    </div>
  );
};
