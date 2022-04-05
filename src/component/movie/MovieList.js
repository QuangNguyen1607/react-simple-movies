import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";
// https://api.themoviedb.org/3/movie/now_playing?5ae50b730fe5db9d3c61455f704dc94f
const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const { data, error } = useSWR(
		"https://api.themoviedb.org/3/movie/now_playing?api_key=5ae50b730fe5db9d3c61455f704dc94f",
		fetcher
	);
	useEffect(() => {
		setMovies(data?.results);
	}, [data]); // Chổ này phải truyền data vì nếu ko có thì nó sẽ báo lỗi vì data chưa fetch về kịp, ở đây set nếu có data thì setmovies dc
	console.log(
		"🚀 ~ file: MovieList.js ~ line 10 ~ MovieList ~ movies",
		movies
	);

	return (
		<div className="movie-list">
			<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
				<SwiperSlide>
					<MovieCard></MovieCard>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default MovieList;
