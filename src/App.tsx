import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

const Cart = React.lazy(() => import("./pages/Cart"));
const SinglePizza = React.lazy(() => import("./pages/SinglePizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

import "./scss/app.scss";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <SinglePizza />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
