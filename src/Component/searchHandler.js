import { useEffect, useState } from 'react';

export const DIST_TABLE_HEADER_KEYS = {
	District: 'district',
	Active: 'active',
	Confirmed: 'confirmed',
	Recovered: 'recovered',
	Deaths: 'deaths',
};
export const STATE_TABLE_HEADER_KEYS = {
	State: 'state',
	Active: 'active',
	Confirmed: 'confirmed',
	Recovered: 'recovered',
	Deaths: 'deaths',
	'Migrated Other': 'migratedother',
	'Last Updated Time': 'lastupdatedtime',
};

export const filterDataSource = (filterKeyword, data, type) => {
	return data.filter((s) => {
		let dName = s[type].toLowerCase();
		let sWord = filterKeyword.toLowerCase();

		return dName.includes(sWord);
	});
};

const sortDataASCByPropertyName = (dataSource, propName, order) => {
	return dataSource.sort((a, b) => {
		return order === 'desc'
			? b[propName] - a[propName]
			: a[propName] - b[propName];
	});
};

export function SearchKeyword() {
	const [keyword, setKeyword] = useState('');

	const handler = (e) => {
		setKeyword(e.target.value);
	};

	return { keyword, handler, filterDataSource };
}

export const SortingStateHook = () => {
	const [sortProps, setSortProps] = useState({
		/*col:order -> asc/desc}*/
	});

	const clickHandler = (colName) => {
		if (sortProps.colName !== colName) {
			let stp = { colName, order: 'desc' };
			setSortProps({ ...stp });
			
		} else {
			let stp = {
				colName,
				order: sortProps.order === 'asc' ? 'desc' : 'asc',
			};
			setSortProps({
				...stp,
			});
		}
	};

	return { sortProps, clickHandler };
};

export function DistrictDataHook(searchKeyword, sortPropsValues) {
	const [district, setDistrict] = useState({ source: [], filtered: [] });

	const districsRes = async () => {
		const res = await fetch(
			'https://data.covid19india.org/state_district_wise.json'
		);
		let districts = await res.json();
		let districtArray = [];

		Object.keys(districts).forEach((s) => {
			try {
				let districtNames = Object.keys(districts[s].districtData);

				let dists = districtNames
					.map((d) => {
						return { ...districts[s].districtData[d], district: d, state: s };
					})
					.filter((dd) => {
						return dd.district !== 'Unassigned' || dd.district !== 'Unknown';
					});

				districtArray.push(...dists);
			} catch (e) {
				console.log(e, s);
			}
		});
		setDistrict({
			...district,
			source: districtArray,
			filtered: districtArray,
		});
	};

	useEffect(() => {
		districsRes();
		// console.log('first');
	}, []);

	useEffect(() => {
		let filteredData = filterDataSource(
			searchKeyword,
			district.source,
			'district'
		);
		setDistrict({ ...district, filtered: filteredData });
	}, [searchKeyword]);

	useEffect(() => {
		let sorted = sortDataASCByPropertyName(
			district.filtered,
			DIST_TABLE_HEADER_KEYS[sortPropsValues.colName],
			sortPropsValues.order
		);
		

		setDistrict({ ...district, filtered: sorted });
	}, [sortPropsValues]);

	return district;
}

export function StateDataHook(searchKeyword, sortPropsValues) {
	const [state, setState] = useState({
		source: [],
		filtered: [],
		sortActive: '', // desc, asc
	});

	const getStates = async () => {
		const res = await fetch('https://data.covid19india.org/data.json');
		const states = await res.json();
		setState({
			...state,
			source: states.statewise,
			filtered: states.statewise,
		});
	};

	useEffect(() => {
		getStates();
	}, []);

	useEffect(() => {
		let newStateData = filterDataSource(searchKeyword, state.source, 'state');
		setState({ ...state, filtered: newStateData });
	}, [searchKeyword]);

	useEffect(() => {
		console.log('////////////////');
		let sorted = sortDataASCByPropertyName(
			state.filtered,
			STATE_TABLE_HEADER_KEYS[sortPropsValues.colName],
			sortPropsValues.order
		);
			
		setState({ ...state, filtered: sorted });
	}, [sortPropsValues]);

	return state;
}
