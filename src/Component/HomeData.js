import React from 'react';
import SearchFilter from './SearchFilter';
import {
	SearchKeyword,
	StateDataHook,
	DistrictDataHook,
	SortingStateHook,
} from './searchHandler';
import DataVisualizer from './visualization';

export default function HomeData(){
	const { sortProps, clickHandler } = SortingStateHook();
	const { keyword, handler } = SearchKeyword();


	let { filtered: districtArray } = DistrictDataHook(keyword, sortProps);
	let { filtered: tableData } = StateDataHook(keyword, sortProps);

	let dArray = districtArray.length;
	let sArray = tableData.length;



	return (
		<>
			<div className="home">
				<SearchFilter
					header="Search COVID19 Data"
					handler={handler}
				></SearchFilter>
				<div className="chart mt-5">
					<div className="row">
						{dArray === '' || sArray === '' ? (
							<>
								<StateChart tableData={tableData} />{' '}
								<DistChart districtArray={districtArray} />
							</>
						) : dArray === 0 ? (
							<StateChart tableData={tableData} />
						) : sArray === 0 ? (
							<DistChart districtArray={districtArray} />
						) : (
							<>
								<StateChart tableData={tableData} />{' '}
								<DistChart districtArray={districtArray} />
							</>
						)}
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
