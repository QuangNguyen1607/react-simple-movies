import React from "react";

const MovieCard = () => {
	return (
		<div className="movies-card rounded-lg p-3 bg-slate-800 text-white">
			<img
				className="w-full h-[250px] object-cover rounded-lg mb-3"
				src="https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
				alt=""
			/>
			<h3 className="font-semibold mb-3 text-xl">Spiderman: Homecoing</h3>
			<div className="flex items-center justify-between text-sm opacity-50 mb-10">
				<span>2017</span>
				<span>7.4</span>
			</div>
			<button className="py-3 px-6 rounded-lg capitalize bg-primary w-full">
				Watch Now
			</button>
		</div>
	);
};

export default MovieCard;
