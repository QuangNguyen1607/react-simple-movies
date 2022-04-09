import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import MovieSection from "../component/movie/MovieSection";
import { apiKey, fetcher, tmdbAPI } from "../config";
const MovieDetailPage = () => {
	const { movieId } = useParams();
	const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
	if (!data) return null;
	const { backdrop_path, poster_path, title, overview, genres } = data;
	return (
		<>
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-25"></div>
				<div
					className="w-full h-full bg-no-repeat bg-cover"
					style={{
						backgroundImage: `url(${tmdbAPI.imageOriginal(
							backdrop_path
						)})`,
					}}
				></div>
			</div>
			<div className="page-container">
				<div className="w-full h-[600px] -mt-[300px] relative z-10 pb-10">
					<img
						src={tmdbAPI.imageOriginal(poster_path)}
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
				<div className="mt-10 mb-10">
					<MovieVideos></MovieVideos>
				</div>
				<MovieSimilar></MovieSimilar>
			</div>
		</>
	);
};
function MovieCredits() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		tmdbAPI.getMovieMeta(movieId, "credits"),
		fetcher
	);
	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null; // Điều kiện này giup1p check có casr hay không và giá trị cast nhiều hơn không hay là không.
	return (
		<>
			{/* Sử dụng slice để chỉ lấy 4 thằng thôi */}
			{cast.slice(0, 4).map(item => (
				<div className="w-full h-full" key={item.id}>
					<img
						src={tmdbAPI.imageOriginal(item.profile_path)}
						alt=""
					/>
					<h3 className="p-3 text-xl text-white font-bold">
						{item.name}
					</h3>
				</div>
			))}
		</>
	);
}
function MovieVideos() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		tmdbAPI.getMovieMeta(movieId, "videos"),
		fetcher
	);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<>
			<div className="w-full aspect-video">
				{/* Đinh cao cái class aspect-video */}

				<h2 className="text-3xl mb-10 inline-block text-white bg-primary py-5 px-5">
					{results[0].name}
				</h2>
				<iframe
					width="100%"
					height="500"
					src={`https://www.youtube.com/embed/${results[0].key}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="w-full h-full object-fill"
				></iframe>
			</div>
		</>
	);
}

function MovieSimilar() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		tmdbAPI.getMovieMeta(movieId, "similar"),
		fetcher
	);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="text-5xl mb-10 mt-10 font-bold text-white text-center">
				Similar Movies
			</h2>
			<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
				{results.length > 0 &&
					results.map(item => (
						<SwiperSlide className="h-auto" key={item.id}>
							<MovieCard item={item}></MovieCard>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
}
export default MovieDetailPage;
