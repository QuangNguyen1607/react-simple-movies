import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { FallbackComponent, fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type = "now_playing" }) => {
	const [movies, setMovies] = useState([]);
	const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	const isLoading = !data && !error;
	useEffect(() => {
		if (data && data.results) setMovies(data.results);
	}, [data]); // Chổ này phải truyền data vì nếu ko có thì nó sẽ báo lỗi vì data chưa fetch về kịp, ở đây set nếu có data thì setmovies dc
	return (
		<div className="movie-list">
			{isLoading && (
				<>
					<Swiper
						grabCursor={"true"}
						spaceBetween={40}
						slidesPerView={4}
					>
						{movies.length > 0 &&
							movies.map(item => (
								<SwiperSlide key={item.id}>
									<MovieCardSkeleton></MovieCardSkeleton>
								</SwiperSlide>
							))}
					</Swiper>
				</>
			)}
			{!isLoading && (
				<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
					{movies.length > 0 &&
						movies.map(item => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</div>
	);
};
MovieList.propTypes = {
	type: PropTypes.string.isRequired,
};
export default withErrorBoundary(MovieList, { FallbackComponent });
