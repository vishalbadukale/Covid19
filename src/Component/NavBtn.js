import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBtn() {
	return (
		<>
			<section className="navBtn">
				<div className="heading">
					<h1 className="text-center">COVID19 Data</h1>
				</div>
				<div className="container">
					<div className="dataBtn">
					<div className="btns mx-3">
						<Link to='/' className='btn btn-success active'> Home</Link>
					</div>
						<div className="btns mx-3">
							<Link to="state" className="btn btn-primary">
								Statewise Data
							</Link>
						</div>
						<div className="btns">
							<Link to="district" className="btn btn-warning">
								Districtwise Data
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
