import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
	const { title, vote_average, release_date, poster_path, id } = item;
	const navigate = useNavigate();
	return (
		<div className="movies-card h-full rounded-lg p-3 bg-slate-800 text-white flex flex-col">
			<img
				className="w-full h-[250px] object-cover rounded-lg mb-3 select-none"
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				alt=""
			/>
			<h3 className="font-semibold mb-3 text-xl">{title}</h3>
			<div className="flex items-center justify-between text-sm opacity-50 mb-10">
				<span>{new Date(release_date).getFullYear()}</span>
				<span>{vote_average}</span>
			</div>
			<button
				onClick={() => navigate(`/movie/${id}`)}
				className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto"
			>
				Watch Now
			</button>
		</div>
	);
};

export default MovieCard;
