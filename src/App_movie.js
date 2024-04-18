
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './layout/Main';
const Home = lazy(()=>import('./routes/Home'));
const Detail = lazy(()=>import('./routes/Detail'));
// import Home from "./routes/Home"
// import Detail from "./routes/Detail"

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<Main />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movie/:id" element={<Detail />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App;
