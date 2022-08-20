import React from 'react'

export default function NotFound(props) {
  return (
		<div className="notfound mb-5 bg-white">
			<i className="fa fa-frown-o fa-5x mb-3" aria-hidden="true"></i>
			<h1>404</h1>
			<h1 className="fw-bolder ">Data Not Found</h1>
		</div>
	);
}
export const AlertNotFound = () => {
    return (
			<div>
				<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
				<h5>Not Found</h5>
			</div>
		);
}
