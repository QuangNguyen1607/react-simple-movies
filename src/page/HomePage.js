import React from "react";
import Banner from "../component/banner/Banner";
import MovieList from "../component/movie/MovieList";
import MovieSection from "../component/movie/MovieSection";
const ListMovie = [
	{
		id: 1,
		title: "Now Playing",
		type: "now_playing",
	},
	{
		id: 2,
		title: "Top Rated",
		type: "top_rated",
	},
	{
		id: 3,
		title: "Trending",
		type: "popular",
	},
];
const HomePage = () => {
	return (
		<>
			<MovieSection data={ListMovie}></MovieSection>
		</>
	);
};

export default HomePage;
