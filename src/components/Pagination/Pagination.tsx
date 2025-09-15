import React from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as filterAction from "../../redux/slice/filterSlice";

import styles from "./Pagination.module.scss";

export const Pagination: React.FC = () => {
  const currentPage = useAppSelector((state) => state.filter.currentPage);
  const dispatch = useAppDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(filterAction.setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
