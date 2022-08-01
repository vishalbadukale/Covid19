import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import {  Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);
export default function DataVisualizer(props) {
	const labels = [];
	const activeCase = [];
	const confirmedCase = [];
	const recoveredCase = [];
	const deathes = [];

	let da = props.statedata || [];
	let sourceName = props.source || 'state';

	da.forEach((s) => {
		labels.push(s[sourceName]);
		activeCase.push(s.active);
		confirmedCase.push(s.confirmed);
		recoveredCase.push(s.recovered);
		deathes.push(s.deaths);
	});

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Active Cases',
				data: activeCase,
				borderColor: 'green',
				backgroundColor: 'green',
			},
			{
				label: 'Confirmed',
				data: confirmedCase,
				borderColor: 'yellow',
				backgroundColor: 'yellow',
			},
			{
				label: 'Recovered',
				data: recoveredCase,
				borderColor: 'gray',
				backgroundColor: 'gray',
			},
			{
				label: 'Deaths',
				data: deathes,
				borderColor: 'red',
				backgroundColor: 'red',
			},
		],
	};

	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Coroana Cases',
				},
			},
		},
	};

	return (
		<>
			<section className="my-5 vv">
				<div className="container ">
					<div className="stateHeading"></div>
					<Bar config={config} data={data}></Bar>
				</div>
			</section>
		</>
	);
}
