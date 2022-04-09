import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=5ae50b730fe5db9d3c61455f704dc94f`,
		fetcher
	);
	const movies = data?.results || []; // Thay vì dụng useState set lên thì dùng như vầy để giảm thiểu tình trạng bị giật
	console.log("🚀 ~ file: Banner.js ~ line 12 ~ Banner ~ movies", movies);
	return (
		<section className="banner h-[500px] page-container mb-20">
			<Swiper grabCursor="true" slidesPerView="auto">
				{movies.length > 0 &&
					movies.map(item => {
						return (
							<SwiperSlide key={item.id}>
								<BannerItem item={item}></BannerItem>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
};
function BannerItem({ item }) {
	const { title, poster_path, id } = item;
	const navigate = useNavigate();
	return (
		<div className="w-full h-full rounded-lg relative">
			<div className="overlay absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
			<img
				className="w-full h-full object-cover rounded-lg object-top"
				src={`https://image.tmdb.org/t/p/original/${poster_path}`}
				alt=""
			/>
			<div className="absolute left-5 bottom-5 w-full text-white">
				<h2 className="font-bold text-3xl mb-3">${title}</h2>
				<div className="flex item-center gap-x-3 mb-5">
					<span className="py-2 px-4 border border-white rounded-sm">
						Advanture
					</span>
					<span className="py-2 px-4 border border-white rounded-sm">
						Action
					</span>
					<span className="py-2 px-4 border border-white rounded-sm">
						PIY
					</span>
				</div>
				<Button className="mt-10" full={false} onClick={() => navigate(`/movie/${id}`)}>
					Watch Now
				</Button>
			</div>
		</div>
	);
}
export default Banner;
