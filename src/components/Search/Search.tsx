import React, { useContext } from "react";

import { SearchContext } from "../../App";

import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const { inputQuery, setInputQuery } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
      <input
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {inputQuery &&
      <img
        className={styles.closeIcon}
        src={closeIcon}
        alt="Close Icon"
        onClick={() => setInputQuery('')}
      />}
    </div>
  );
};
