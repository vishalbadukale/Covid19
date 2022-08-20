import React from 'react';
import NotFound from './NotFound';
import SearchFilter from './SearchFilter';
import {
	SearchKeyword,
	StateDataHook,
	DistrictDataHook,
	SortingStateHook,
} from './searchHandler';
import DataVisualizer from './visualization';

export default function HomeData(){
	const { sortProps} = SortingStateHook();
	const { keyword, handler } = SearchKeyword();

	let { filtered: districtArray } = DistrictDataHook(keyword, sortProps);
	let { filtered: tableData } = StateDataHook(keyword, sortProps);

	console.log(handler);
	return (
		<>
			<div className="home ">
				<SearchFilter
					header="Search COVID19 Data"
					handler={handler}
				></SearchFilter>
				<div className="chart ounded-3 mt-5">
					<div className="row">
						<StateChart tableData={tableData} />{' '}
						<DistChart districtArray={districtArray} />
						<NotFound/>

						
					</div>
				</div>
			</div>
		</>
	);
};


export function StateChart(props) {
	return (
		<div className="col-sm-6 col-md-12 ss">
			<h4 className="text-center my-4">State COVID Cases</h4>
			<DataVisualizer
				statedata={props.tableData}
				source="state"
			></DataVisualizer>
		</div>
	);
}

export function DistChart(props) {
	return (
		<div className="col-sm-6 col-sm-12 ss my-5">
			<h4 className="text-center my-4">District COVID Cases</h4>
			<DataVisualizer
				statedata={props.districtArray}
				source="district"
			></DataVisualizer>
		</div>
	);
}
