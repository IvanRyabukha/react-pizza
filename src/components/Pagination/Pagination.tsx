import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type Props = {
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
