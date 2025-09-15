import React, { useEffect } from "react";

// import qs from "qs";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import * as filterAction from "../redux/slice/filterSlice";
// import type { SortType } from "../types/SortType";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import * as pizzasAction from "../redux/slice/pizzaSlice";

import {Skeleton, PizzaBlock, Categories, Sort, Pagination } from '../components';

export const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const { items, isLoading } = useAppSelector((state) => state.pizza);
  const { categoryId, sort, currentPage, searchQuery } = useAppSelector(
    (state) => state.filter
  );

  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchQuery ? `&search=${searchQuery}` : "";

    dispatch(
      pizzasAction.fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендре
  useEffect(() => {
    getPizzas();
    // if (isMounted.current) {
    //   const queryString = qs.stringify({
    //     sortProperty: sort.sortProperty,
    //     categoryId,
    //     currentPage,
    //   });
    //   navigate(`?${queryString}`);
    // }
    // isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, searchQuery]);

  // Если был первый рендер, то проверяем параметры ЮРЛ и сохраняем в редакс
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = list.find(
  //       (option) => option.sortProperty === params.sortProperty
  //     );

  //     dispatch(
  //       filterAction.setFilters({
  //         sort: sort as SortType,
  //         categoryId: params.categoryId as string,
  //         currentPage: params.currentPage as string,
  //       })
  //     );

  //     isSearch.current = true;
  //   }
  // }, []);

  // // Если был первый рендре, то запрашиваем пиццы
  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if (!isSearch.current) {
  //     getPizzas();
  //   }

  //   isSearch.current = false;
  // }, [categoryId, sort.sortProperty, searchQuery, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {isLoading === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  );
};
