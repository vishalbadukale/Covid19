import React from 'react';

export default function SearchFilter(props) {
	return (
		<div className="card-header searchBox col-md-12">
			<div className="stateHead">
				<h5>{props.header}</h5>
			</div>
			<div className="filter">
				<div className="searchArea my-3" id="navbar-example2">
					<div className="state mx-4">
						<div className="inputs">
							<input
								type="search"
								className="form-control"
								placeholder="Search.."
								onChange={props.handler}
							/>
							<i className="fa fa-search" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
