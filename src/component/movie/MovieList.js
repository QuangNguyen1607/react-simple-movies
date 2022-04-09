import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
// https://api.themoviedb.org/3/movie/now_playing?5ae50b730fe5db9d3c61455f704dc94f
const MovieList = ({ type = "now_playing" }) => {
	const [movies, setMovies] = useState([]);
	// const { data, error } = useSWR(
	// 	`https://api.themoviedb.org/3/movie/${type}?api_key=5ae50b730fe5db9d3c61455f704dc94f`,
	// 	fetcher
	// );
	const { data, error } = useSWR(
		tmdbAPI.getMovieList(type),
		fetcher
	);
	useEffect(() => {
		if (data && data.results) setMovies(data.results);
	}, [data]); // Chổ này phải truyền data vì nếu ko có thì nó sẽ báo lỗi vì data chưa fetch về kịp, ở đây set nếu có data thì setmovies dc
	return (
		<div className="movie-list">
			<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
				{movies.length > 0 &&
					movies.map(item => (
						<SwiperSlide key={item.id}>
							<MovieCard item={item}></MovieCard>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};
MovieList.propTypes = {
	type: PropTypes.string.isRequired,
};
export default MovieList;
