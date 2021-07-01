import React, { useEffect, useState } from 'react';
import './Row.css';
import ClearIcon from '@material-ui/icons/Clear';
import requests from '../requests';
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [movieOverview, setMovieOverview] = useState(false);
	const [movieDesc, setMovieDesc] = useState();
	const [youtubeId, setYoutubeId] = useState([]);

	const baseUrl = 'https://api.themoviedb.org/3';
	const baseImgUrl = 'https://image.tmdb.org/t/p/original';

	console.log(movieDesc);
	console.log(youtubeId);

	useEffect(() => {
		fetch(`${baseUrl}${fetchUrl}`)
			.then((Response) => Response.json())
			.then((data) => setMovies(data.results));
	}, [fetchUrl]);

	const showMovieOverview = (movie, e) => {
		let url = requests.fetchMovieDetails.replace('ID', movie.id);
		let trailerUrl = requests.fetchMovieId.replace('ID', movie.id);
		console.log(`${baseUrl}${url}`, movie.id);
		fetch(`${baseUrl}${url}`)
			.then((Response) => Response.json())
			.then((data) => setMovieDesc(data));
		fetch(`${baseUrl}${trailerUrl}`)
			.then((Response) => Response.json())
			.then((data) => setYoutubeId(data.results));
		e.target.parentElement.parentElement.parentElement.classList.add('disableScroll');
		setMovieOverview(true);
	};

	const enableScroll = (e) => {
		console.log(
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement
				.parentElement
		);
		e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
			'disableScroll'
		);
	};

	const opts = {
		playerVars: {
			autoplay: 0,
		},
	};

	return (
		<div className="row">
			<h2 className="row__heading">{title}</h2>
			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={(e) => showMovieOverview(movie, e)}
						className={isLargeRow ? 'row__largeImg' : 'row__smallImg'}
						src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
						alt={movie.title}
					/>
				))}

				<div className={`overview--fadeOut ${movieOverview && 'row__movieOverview'} `}>
					<div>
						<h1>{movieDesc?.title}</h1>
						<div className="row__clearIcon">
							<ClearIcon
								className="clearIcon"
								onClick={(e) => (
									setMovieOverview(false), enableScroll(e), setYoutubeId('')
								)}
							/>
						</div>

						<div className="overview__poster">
							<img src={`${baseImgUrl}${movieDesc?.poster_path}`} alt="" />
							<div>
								<p>
									<strong>Rating:</strong> {movieDesc?.vote_average}/10
								</p>
								<p>
									<strong>Genres:</strong>{' '}
									{movieDesc &&
										movieDesc?.genres.map((genre, index) =>
											movieDesc?.genres.length - 1 !== index
												? `${genre.name}, `
												: `${genre.name}.`
										)}
								</p>
								<p>
									<strong>Languages:</strong>{' '}
									{movieDesc?.spoken_languages.map((language, index) =>
										movieDesc?.spoken_languages.length - 1 !== index
											? `${language.english_name}, `
											: `${language.english_name}.`
									)}
								</p>
								<p>
									<strong>Runtime:</strong> {movieDesc?.runtime}
									{'m'}
								</p>
								<p>
									<strong>Status:</strong> {movieDesc?.status}
								</p>
								<p>
									<strong>Release date:</strong> {movieDesc?.release_date}
								</p>
								<p>
									<strong>County:</strong> {movieDesc?.production_countries[0]?.name}
								</p>
								<p>
									<strong>Watch Now:</strong>{' '}
									<a href={movieDesc?.homepage} target="_blank">
										{movieDesc?.title}
									</a>
								</p>
							</div>
						</div>
						<div className="youtube">
							<p>
								<strong>Description</strong>: {movieDesc?.overview}
							</p>

							<div>
								<p>
									<strong>Trailer:</strong>
								</p>
								<YouTube
									videoId={youtubeId[0]?.key} // defaults -> null
									className="youtube__video" // defaults -> null
									opts={opts} // defaults -> {}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Row;
