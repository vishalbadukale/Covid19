import React from 'react';
import SortArrow from './SortArrow';

function MyDataTable(props) {

	return (
		<div className="card-body">
			<div className="table-responsive">
				<table
					id="example"
					className="table table-striped"
					style={{ width: '100%' }}
				>
					<thead>
						{/* <i className="fa fa-arrow-up" aria-hidden="true"></i>
						<i className="fa fa-arrow-down" aria-hidden="true"></i> */}
						<tr>
							{props.headers.map((h, i) => {
								if (h === 'State' || h === 'District'){
									return (
										<th className="text-center" style={{paddingBottom: "25px"}}
											onClick={() => props.sortHandler(h)}
											key={i}> {h}</th>
									);
								}
								else if(h !== "State" || h !== "District"){
									return (
										<th
											className="text-center"
											onClick={() => props.sortHandler(h)}
											key={i}
										>
											{' '}
											{h}<SortArrow/>	
										</th>
									);
								}
							})}
						</tr>
					</thead>
					<tbody>
						{props.tableData.map((data, i) => {
							return (
								<tr className="text-center" key={i}>
									{props.tableKeys.map((k, i) => {
										return <td key={i}>{data[k]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default MyDataTable;
