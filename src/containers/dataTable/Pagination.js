import React, {useState, useEffect, useMemo} from 'react';
import classes from './index.module.css';

import PaginationButton from '../../components/PaginationButton';
import PaginationItem from '../../components/PaginationItem';
import ITEMS_PER_PAGE from '../../constants/PaginationItemsPerPage';

const Pagination = ({total = 0, itemsPerPage = ITEMS_PER_PAGE, currentPage = 1, onPageChange}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if(total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  const renderItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
      <PaginationItem 
        key={i} 
        text={i}
        active={i === currentPage} 
        onClick={() => onPageChange(i)} />
      );
    }
    return pages;
  }, [totalPages, currentPage, onPageChange] );

  if (totalPages === 0) return null;

  return (
    <div className={classes.Pagination}>
      <PaginationButton 
        text='<' 
        disable={currentPage === 1} 
        onClick ={() => onPageChange(currentPage - 1)} />
      {renderItems}
      <PaginationButton 
        text='>' 
        disable={currentPage === totalPages} 
        onClick ={() => onPageChange(currentPage + 1)}
      />
    </div>
  )
}

export default Pagination;