import React from 'react';
import DataVisualizer from './visualization';
import MyDataTable from './tableBuilder';
import SearchFilter from './SearchFilter';
import {
	SearchKeyword,
	DistrictDataHook,
	SortingStateHook,
	DIST_TABLE_HEADER_KEYS,
} from './searchHandler';

export default function DistrictData() {
	const { keyword, handler } = SearchKeyword();

	const { clickHandler, sortProps } = SortingStateHook();

	const headers = Object.keys(DIST_TABLE_HEADER_KEYS);
	const tableKeys = headers.map((h) => DIST_TABLE_HEADER_KEYS[h]);

	let { filtered: districtArray } = DistrictDataHook(keyword, sortProps);

	return (
		<>
			<div className="distHeadings">
				<h4 className="text-center">District COVID Details</h4>
			</div>
			<DataVisualizer
				statedata={districtArray}
				source="district"
			></DataVisualizer>
			<div className="card">
				<SearchFilter header="District" handler={handler}></SearchFilter>
				<MyDataTable
					headers={headers}
					tableData={districtArray}
					tableKeys={tableKeys}
					sortHandler={clickHandler}
				></MyDataTable>
			</div>
		</>
	);
}
