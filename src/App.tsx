import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

import "./scss/app.scss";

const App: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');

  return (
    <div className="wrapper">
      <Header
        inputQuery={inputQuery}
        onChangeInputQuery={setInputQuery}
      />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home inputQuery={inputQuery} />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
};

export default App;
