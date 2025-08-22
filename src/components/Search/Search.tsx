import React from "react";

import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
import styles from "./Search.module.scss";

type Props = {
  inputQuery: string;
  onChangeInputQuery: (query: string) => void;
};

export const Search: React.FC<Props> = ({ inputQuery, onChangeInputQuery }) => {
  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
      <input
        value={inputQuery}
        onChange={(e) => onChangeInputQuery(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {inputQuery &&
      <img
        className={styles.closeIcon}
        src={closeIcon}
        alt="Close Icon"
        onClick={() => onChangeInputQuery('')}
      />}
    </div>
  );
};
