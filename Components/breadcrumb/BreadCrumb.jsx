import Link from 'next/link';
import React from 'react';

const BreadCrumb = (props) => {
  return (
    <div className="mt-5">
      {props.paths.map((data, i, arr) => {
        if (i === arr.length - 1) {
          return <Link href={data.path}>{data.page}</Link>;
        } else {
          return (
            <span>
              <Link href={data.path}>{data.page}</Link>
              <span>/</span>
            </span>
          );
        }
      })}
    </div>
  );
};

export default BreadCrumb;
