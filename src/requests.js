const API_KEY = '8b1cdff433c214d60aa25728d0445fe1';

const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchMovieDetails: `/movie/ID?api_key=${API_KEY}&language=en-US`,
	fetchMovieId: `/movie/ID/videos?api_key=${API_KEY}&language=en-US`,
	fetchNowPlaying: `/movie/ID/watch/providers?api_key=${API_KEY}`,
};

export default requests;
