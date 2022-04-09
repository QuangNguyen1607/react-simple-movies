import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";

const MovieCard = ({ item }) => {
	const { title, vote_average, release_date, poster_path, id } = item;
	const navigate = useNavigate();
	return (
		<div className="movies-card h-full rounded-lg p-3 bg-slate-800 text-white flex flex-col">
			<img
				className="w-full h-[250px] object-cover rounded-lg mb-3 select-none"
				src={tmdbAPI.imageOriginal(poster_path)}
				alt=""
			/>
			<h3 className="font-semibold mb-3 text-xl">{title}</h3>
			<div className="flex items-center justify-between text-sm opacity-50 mb-10">
				<span>{new Date(release_date).getFullYear()}</span>
				<span>{vote_average}</span>
			</div>
			<Button
				bgColor="secondary"
				onClick={() => navigate(`/movie/${id}`)}
			>
				Watch Now
			</Button>
		</div>
	);
};

export default MovieCard;
