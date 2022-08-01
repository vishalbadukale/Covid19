import React from 'react'
import { Routes, Route } from 'react-router-dom';
import DistrictData from './DistrictData';
import HomeData from './HomeData';

import NavBtn from './NavBtn';
import StateData from './StateData';

export default function RouterData() {
  return (
		<>
			<NavBtn />
			<Routes>
				<Route path="/" element={<HomeData />} />
				<Route path="/state" element={<StateData />} />
				<Route path="/district" element={<DistrictData />} />
			</Routes>
		</>
	);
}
