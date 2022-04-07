import React from "react";
import MovieList from "./MovieList";

const MovieSection = ({ data }) => {
	return (
		<>
			{data.map(({ id, title, type }) => (
				<section
					className="movies-layout page-container pb-10"
					key={id}
				>
					<h2 className="capitalize text-white mb-10 text-3xl font-bold">
						{title}
					</h2>
					<MovieList type={type}></MovieList>
				</section>
			))}
		</>
	);
};

export default MovieSection;
