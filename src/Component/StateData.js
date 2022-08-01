import React from 'react';
import DataVisualizer from './visualization';
import MyDataTable from './tableBuilder';
import SearchFilter from './SearchFilter';
import { SearchKeyword, SortingStateHook, StateDataHook } from './searchHandler';

export default function StateData() {
	
	const { keyword, handler } = SearchKeyword();
	const { sortProps, clickHandler } = SortingStateHook();

	const headersKeys = {
		State: 'state',
		Active: 'active',
		Confirmed: 'confirmed',
		Recovered: 'recovered',
		Deaths: 'deaths',
		'Migrated Other': 'migratedother',
		'Last Updated Time': 'lastupdatedtime',
	};

	const headers = Object.keys(headersKeys);
	const tableKeys = headers.map((h) => headersKeys[h]);

	let { filtered: tableData } = StateDataHook(keyword, sortProps);

	return (
		<>
			{' '}
			<div className="stateHeadings">
				<h4 className="text-center">State COVID Details</h4>
			</div>
			<DataVisualizer statedata={tableData} source="state"></DataVisualizer>
			<div className="card">
				<SearchFilter header="State" handler={handler}></SearchFilter>
				<MyDataTable
					headers={headers}
					tableData={tableData}
					tableKeys={tableKeys}
					sortHandler={clickHandler}
				></MyDataTable>
			</div>
		</>
	);
}
