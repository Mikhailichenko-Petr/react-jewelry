import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type paginationType={ cuurentPage:number, onChangePage:(e:number)=>void }

export const Pagination:React.FC<paginationType> = ({ cuurentPage, onChangePage }) => {
  useWhyDidYouUpdate('Pagination',{ cuurentPage, onChangePage })
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