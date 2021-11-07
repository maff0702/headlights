import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';
import { setPage } from '../../store/productsSlice';

const Pagination: FC<{limit:number}> = ({ limit }) => {
  const dispatch = useDispatch();
  const { totalCount } = useSelector((state) => state.products);
  const pages = Math.ceil(totalCount / limit);

  const handlePageClick = (event:{selected:number}) => {
    dispatch(setPage(event.selected + 1));
  };

  return (
    <>
      {pages > 1
        ? <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        breakClassName={styles.page}
        pageClassName={styles.page}
        activeClassName={styles.page_active}
        nextClassName={styles.page}
        previousClassName={styles.page}
        pageRangeDisplayed={3}
        pageCount={pages}
        previousLabel="<"
        marginPagesDisplayed={1}
      />
      : null}
    </>
  );
};

export default Pagination;
