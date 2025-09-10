import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

import * as filterAction from "../../redux/slice/filterSlice";
import { useAppDispatch } from "../../redux/hooks";

import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentInputQuery, setCurrentInputQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClear = () => {
    dispatch(filterAction.setSearchQuery(""));
    setCurrentInputQuery("");
    inputRef.current?.focus();
  };

  const handleInputChange = useCallback(
    debounce((query) => {
      dispatch(filterAction.setSearchQuery(query));
    }, 300),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputQuery(e.target.value);
    handleInputChange(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
      <input
        ref={inputRef}
        value={currentInputQuery}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {currentInputQuery && (
        <img
          className={styles.closeIcon}
          src={closeIcon}
          alt="Close Icon"
          onClick={handleInputClear}
        />
      )}
    </div>
  );
};
