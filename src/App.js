import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import MovieList from "./component/movie/MovieList";

function App() {
	return (
		<Fragment>
			<header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
				<span className="text-primary">Home</span>
				<span>Movies</span>
			</header>
			<section className="banner h-[500px] page-container mb-20">
				<div className="w-full h-full rounded-lg relative">
					<div className="overlay absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
					<img
						className="w-full h-full object-cover rounded-lg"
						src="https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF2ZW5nZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
						alt=""
					/>
					<div className="absolute left-5 bottom-5 w-full text-white">
						<h2 className="font-bold text-3xl mb-3">
							Avengers: Endgame
						</h2>
						<div className="flex item-center gap-x-3">
							<span className="py-2 px-4 border border-white rounded-sm">
								Advanture
							</span>
							<span className="py-2 px-4 border border-white rounded-sm">
								Action
							</span>
							<span className="py-2 px-4 border border-white rounded-sm">
								PIY
							</span>
						</div>
						<button className="py-3 px-6 rounded-lg bg-primary text-white font-medium mt-5">
							Watch now
						</button>
					</div>
				</div>
			</section>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Now Playing
				</h2>
				<MovieList></MovieList>
			</section>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Top rated
				</h2>
				<MovieList></MovieList>
			</section>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Trending
				</h2>
				<MovieList></MovieList>
			</section>
		</Fragment>
	);
}

export default App;
