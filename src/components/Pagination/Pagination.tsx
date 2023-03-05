import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type paginationProps = {
    onChangePage: any;
    currentPage: number;
}

function Pagination( {onChangePage, currentPage}: paginationProps) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
        />
    );
}

export default Pagination;