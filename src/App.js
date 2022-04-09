import { Fragment, lazy, Suspense } from "react";
import "swiper/css";
import { Routes, Route } from "react-router-dom";
import Main from "./component/layout/Main";
// import HomePage from "./page/HomePage";
import Banner from "./component/banner/Banner";
// import MoviePage from "./page/MoviePage";
// import MovieDetailPage from "./page/MovieDetailPage";

const HomePage = lazy(() => import("./page/HomePage"));
const MoviePage = lazy(() => import("./page/MoviePage"));
const MovieDetailPage = lazy(() => import("./page/MovieDetailPage"));

function App() {
	return (
		<Fragment>
			{/* fallback hiểu rằng nó giống như component loading vậy, nếu component nó chưa load hay mạng yếu thì nó sẽ có chữ loading hiện ra=> đây là giá trị bắt buộc có thể điền component vào hoạc Fragment
			 */}
			<Suspense fallback={<></>}>
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
			</Suspense>
		</Fragment>
	);
}

export default App;
