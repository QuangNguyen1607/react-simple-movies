export const fetcher = (...args) => fetch(...args).then(res => res.json());
export const apiKey = "5ae50b730fe5db9d3c61455f704dc94f";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
	getMovieList: (type, page = 1) =>
		`${tmdbEndpoint}/${type}?api_key=${apiKey}${page ? `&page=${page}` : ''}`,
	getMovieDetail: movieId => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
	getMovieMeta: (movieId, meta) =>
		`${tmdbEndpoint}/${movieId}/${meta}?api_key=${apiKey}`,
	imageOriginal: url => `https://image.tmdb.org/t/p/original/${url}`,
	getMovieSearch: (query, nextPage) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${nextPage}`,
};
