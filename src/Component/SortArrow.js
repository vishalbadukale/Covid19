import React from 'react'
import { SortingStateHook } from './searchHandler';

export default function SortArrow() {
    const { sortProps, clickHandler } = SortingStateHook();
    console.log(sortProps.order+" " + sortProps.colName)
  return (
		<div className="sort text-center">
			<i className="fa fa-arrow-up-long" aria-hidden="true"></i>
			<i className="fa fa-arrow-down-long" aria-hidden="true"></i>
		</div>
	);
}
