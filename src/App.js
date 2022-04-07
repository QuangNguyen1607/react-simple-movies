import { Fragment } from "react";
import "swiper/css";
import { Routes, Route } from "react-router-dom";
import Main from "./component/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./component/banner/Banner";
import MoviePage from "./page/MoviePage";
import MovieDetailPage from "./page/MovieDetailPage";

function App() {
	return (
		<Fragment>
			<Routes>
				{/* Áp dụng cơ chế Nested Route */}
				<Route path="/" element={<Main></Main>}>
					<Route
						path="/"
						element={
							<>
								<Banner></Banner>
								<HomePage></HomePage>
							</>
						}
					></Route>
					<Route
						path="/movies"
						element={<MoviePage></MoviePage>}
					></Route>
					<Route
						path="/movie/:movieId"
						element={<MovieDetailPage></MovieDetailPage>}
					></Route>
				</Route>
			</Routes>
		</Fragment>
	);
}

export default App;
