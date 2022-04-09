import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import { apiKey, fetcher, tmdbAPI } from "../config";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;
const pageCount = 5;
const MoviePage = () => {
	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
	const filterDebounce = useDebounce(filter, 500);
	const handleFilterhange = e => {
		setFilter(e.target.value);
	};
	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error; // Nếu không có data và không có lỗi thì sẽ cho loading => chổ này sẽ trả về true hoặc false
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	useEffect(() => {
		if (!data || !data.total_results) return; // Nếu không có data hoặc không có data total_pages thì sẽ không chạy tiếp
		const endOffset = itemOffset + itemsPerPage; // Offset là dấu ...
		setPageCount(Math.ceil(data.total_results / itemsPerPage)); // Tính tổng số lượng page khi set itemsPerPage số sản phẩm hiển thị ở 1 trang
	}, [data, itemOffset]);
	const handlePageClick = event => {
		const newOffset = (event.selected * itemsPerPage) % data.total_results; // event.selected là khi click vào 1 thì nó lấy về 1 click 2 lấy về 2 nó là số trnag
		setItemOffset(newOffset); // Offset để hiển thị dấu 3 chấm 1
		setNextPage(event.selected + 1);
	};
	useEffect(() => {
		if (filterDebounce) {
			setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
		} else {
			setUrl(tmdbAPI.getMovieList("popular", nextPage));
		}
	}, [filterDebounce, nextPage]);
	// if (!data) return null; // Chổ này mà để thì nó sẽ bị giựt khi click vì nó trả về data null rồi mới có dữ liệu giải phá đưa ra
	const movies = data?.results || []; // Dùng cài này sẽ giải quyết tình trạng bị giựt khi return null
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
			{loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto"></div>
			)}
			<div className="grid grid-cols-4 gap-10">
				{/* Chở này không có loading và movies có giá trị thì mới show cái kia ra */}
				{!loading &&
					movies.length > 0 &&
					movies.map(item => (
						<MovieCard item={item} key={item.id}></MovieCard>
					))}
			</div>
			<div className="mt-10 text-white">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					className="pagination"
				/>
			</div>
			<div className="hidden flex items-center justify-center text-white my-10 gap-10">
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage - 1)}
				>
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</span>
				{/* Hàm này sẽ dùng như Array(9).fill(null) */}
				{new Array(pageCount).fill(0).map((item, index) => (
					<span
						key={index}
						className={`cursor-pointer inline-block rounded-sm py-3 px-4 leading-none ${
							index + 1 === nextPage
								? "bg-primary text-white"
								: "bg-white text-slate-900"
						} `}
						onClick={() => setNextPage(index + 1)}
					>
						{index + 1}
					</span>
				))}
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage + 1)}
				>
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
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default MoviePage;
