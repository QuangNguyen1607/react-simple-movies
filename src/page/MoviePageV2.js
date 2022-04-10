import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../component/movie/MovieCard";
import { apiKey, fetcher, tmdbAPI } from "../config";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import Button from "component/button/Button";
import useSWRInfinite from "swr/infinite";
const itemsPerPage = 20;
const MoviePage = () => {
	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
	const filterDebounce = useDebounce(filter, 500);
	const handleFilterhange = e => {
		setFilter(e.target.value);
	};
	// const { data, error } = useSWR(url, fetcher);
	const { data, error, size, setSize } = useSWRInfinite(
		index => url.replace("page=1", `page=${index + 1}`),
		fetcher
	);
	console.log("🚀 ~ file: MoviePageV2.js ~ line 24 ~ MoviePage ~ data", data);
	// Lúc này chưa ra giá trị vì giá trị trả về hiện tại là 1 mảng chứ không phải object nữa
	// reduce nó sẽ có 2 parameter, cái đầu là function, cái phía sau là initial value
	const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : []; // Ta hiểu cái hàm này rồi
	const loading = !data && !error;
	const isEmpty = data?.[0]?.results.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[data.length - 1]?.results.length < itemsPerPage);
	console.log(
		"🚀 ~ file: MoviePageV2.js ~ line 31 ~ MoviePage ~ isReachingEnd",
		isReachingEnd
	);
	useEffect(() => {
		if (filterDebounce) {
			setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
		} else {
			setUrl(tmdbAPI.getMovieList("popular", nextPage));
		}
	}, [filterDebounce, nextPage]);
	return (
		<div className="py-10 page-container">
			{}
			<div className="flex mb-10">
				<div className="flex-1">
					<input
						type="text"
						className="text-white w-full h-full pl-5 border-none bg-slate-800 outline-none"
						placeholder="Type here to search"
						onChange={handleFilterhange}
					/>
				</div>
				<button className="flex-[0_0_50px] h-[50px] flex items-center justify-center bg-primary text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			{/* Chổ này nếu có loading thì hiện cái dưới */}
			{/* {loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto mb-10 "></div>
			)} */}

			<div className="grid grid-cols-4 gap-10">
				{/* Chở này không có loading và movies có giá trị thì mới show cái kia ra */}
				{/* Chổ này do xài map mà map thì phải có key mà này ko có dữ liệu */}
				{/* Cái v4 này là 1 function nó sẽ trả về key theo milisecond vì vậy ko bao giờ bị trùng */}
				{loading &&
					Array(itemsPerPage)
						.fill(null)
						.map(item => (
							<MovieCardSkeleton key={v4()}></MovieCardSkeleton>
						))}
			</div>
			<div className="grid grid-cols-4 gap-10">
				{/* Chở này không có loading và movies có giá trị thì mới show cái kia ra */}
				{!loading &&
					movies.length > 0 &&
					movies.map(item => (
						<MovieCard item={item} key={item.id}></MovieCard>
					))}
			</div>
			{/* Chức năng loadmore */}
			<div className="mt-10 text-center">
				<Button
					full={false}
					className={`text-white ${
						isReachingEnd ? "bg-gray-300" : ""
					}`}
					onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
					disabled={isReachingEnd}
				>
					{isReachingEnd ? "No Product Load" : "Load More"}
				</Button>
			</div>
		</div>
	);
};

export default MoviePage;
