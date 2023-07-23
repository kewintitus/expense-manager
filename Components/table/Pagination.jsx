'use client';
import React from 'react';
import PaginationItem from './PaginationItem';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="justify-self-end mx-auto  mb-2">
      <div className="flex gap-1 h-auto px-1">
        <PaginationItem>
          <FaChevronLeft />
        </PaginationItem>
        <PaginationItem isActive={true}>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
        <PaginationItem>3</PaginationItem>
        <PaginationItem>4</PaginationItem>
        <PaginationItem>5</PaginationItem>
        <PaginationItem>
          <FaChevronRight />
        </PaginationItem>
      </div>
    </div>
  );
};

export default Pagination;
