import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type paginationType={ cuurentPage:number, onChangePage:any }

const Pagination:React.FC<paginationType> = ({ cuurentPage, onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        // farcePage={cuurentPage - 1}
        previousLabel="<"
      />
    </div>
  );
};
export default Pagination;
