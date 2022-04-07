import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
const MovieDetailPage = () => {
	// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
	const { movieId } = useParams();
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
		fetcher
	);
	if (!data) return null;
	const { backdrop_path, poster_path, title, overview, genres } = data;
	return (
		<>
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-25"></div>
				<div
					className="w-full h-full bg-no-repeat bg-cover"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					}}
				></div>
			</div>
			<div className="page-container">
				<div className="w-full h-[600px] -mt-[300px] relative z-10 pb-10">
					<img
						src={`https://image.tmdb.org/t/p/original/${poster_path}`}
						alt=""
						className="w-full h-full object-cover object-top"
					/>
				</div>
				<div className="title text-5xl font-semibold text-white text-center mb-10 mt-10">
					{title}
				</div>
				<div className="">
					<ul className="flex items-center justify-center gap-5">
						{genres.length > 0 &&
							genres.map(item => (
								<li
									key={item.id}
									className="flex items-center justify-center text-lg font-semibold border-[#7D6AFF] border-solid border px-4 py-2 rounded-3xl text-[#7D6AFF]"
								>
									{item.name}
								</li>
							))}
					</ul>
				</div>
				<div className="text-white text-center mt-10 mb-10">
					<p>{overview}</p>
				</div>
				<div className="text-center text-5xl font-bold text-white">
					Cast
				</div>
				<div className="grid grid-cols-4 gap-5 mt-10 mb-10">
					<MovieCredits></MovieCredits>
				</div>
				<div className="w-full h-[500px] mt-20 mb-20">
					<img
						src={`https://image.tmdb.org/t/p/original/${poster_path}`}
						alt=""
						className="w-full h-full object-cover object-top"
					/>
				</div>
			</div>
		</>
	);
};
function MovieCredits() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		` https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
		fetcher
	);
	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null;
	return (
		<>
			{cast.map(item => (
				<div className="w-full h-full" key={item.id}>
					<img
						src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
						alt=""
					/>
				</div>
			))}
		</>
	);
}
export default MovieDetailPage;
