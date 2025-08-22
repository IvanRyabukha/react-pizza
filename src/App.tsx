import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

import "./scss/app.scss";

type SearchContextType = {
  inputQuery: string;
  setInputQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchContextType>({
  inputQuery: '',
  setInputQuery: () => {},
});

const App: React.FC = () => {
  const [inputQuery, setInputQuery] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ inputQuery, setInputQuery }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default App;
