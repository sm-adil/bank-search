import React from 'react';

const Pagination = ({ banksPerPage, totalBanks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBanks / banksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page__item'>
            <a onClick={() => paginate(number)} href='!#' className='page__link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;