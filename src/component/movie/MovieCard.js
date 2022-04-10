import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI, FallbackComponent } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "component/loading/LoadingSkeleton";

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
				<span>
					{release_date && new Date(release_date).getFullYear()}
				</span>
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

export const MovieCardSkeleton = () => {
	return (
		<div className="movies-card h-full rounded-lg p-3 bg-slate-800 text-white flex flex-col">
			<LoadingSkeleton
				width="100%"
				height="250px"
				radius="8px"
				className="mb-5"
			></LoadingSkeleton>
			<h3 className="font-semibold mb-3 text-xl">
				<LoadingSkeleton width="100%" height="50px"></LoadingSkeleton>
			</h3>
			<div className="flex items-center justify-between text-sm opacity-50 mb-10">
				<span>
					<LoadingSkeleton
						width="50px"
						height="10px"
					></LoadingSkeleton>
				</span>
				<span>
					<LoadingSkeleton
						width="30px"
						height="10px"
						radius="6px"
					></LoadingSkeleton>
				</span>
			</div>
			<LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
		</div>
	);
};

// Sử dụng shape ở đâu vì trong cái props này nó sẽ có nhiều dữ liệu object, thì mình muốn những dữ liệu trong đây nó cũng phải thỏa kiểu dữ liệu của mình yêu cầu.
MovieCard.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		vote_average: PropTypes.number,
		release_date: PropTypes.string,
		poster_path: PropTypes.string,
		id: PropTypes.number,
	}),
};

export default withErrorBoundary(MovieCard, {
	FallbackComponent,
});
