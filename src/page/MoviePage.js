import React from "react";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import MovieList from "../component/movie/MovieList";
import MovieSection from "../component/movie/MovieSection";
import { fetcher } from "../config";

const ListMovie = [
	{
		id: 1,
		title: "Latest",
		type: "latest",
	},
	{
		id: 2,
		title: "Now Playing",
		type: "now_playing",
	},
	{
		id: 3,
		title: "Top Rated",
		type: "top_rated",
	},
	{
		id: 4,
		title: "Trending",
		type: "popular",
	},
];
const MoviePage = () => {
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/popular?api_key=5ae50b730fe5db9d3c61455f704dc94f`,
		fetcher
	);
    console.log("🚀 ~ file: MoviePage.js ~ line 35 ~ MoviePage ~ data", data)
	const movies = data?.results || [];
	return (
		<div className="py-10 page-container">
			<div className="flex mb-10">
				<div className="flex-1">
					<input
						type="text"
						className="w-full h-full pl-5 border-none bg-slate-800 outline-none"
						placeholder="Type here to search"
					/>
				</div>
				<button className="flex-[0_0_50px] h-[50px] flex items-center justify-center bg-primary text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			<div className="grid grid-cols-4 gap-10">
				{movies.length > 0 &&
					movies.map(item => (
						<MovieCard item={item} key={item.id}></MovieCard>
					))}
			</div>
		</div>
	);
};

export default MoviePage;
