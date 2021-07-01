import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({ fetchUrl }) => {
	const [movies, setMovies] = useState([]);
	const baseUrl = 'https://api.themoviedb.org/3';
	const baseImgUrl = 'https://image.tmdb.org/t/p/original';

	useEffect(() => {
		fetch(`${baseUrl}${fetchUrl}`)
			.then((Response) => Response.json())
			.then((data) =>
				setMovies(data.results[Math.floor(Math.random() * data.results.length - 1)])
			);
	}, [fetchUrl]);

	return (
		<div>
			<header
				className="header"
				style={{
					backgroundImage: `url(${baseImgUrl}${movies?.backdrop_path})`,
					backgroundPosition: 'top',
					backgroundSize: 'cover	',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div className="header__content">
					<h1 className="header__heading">{movies?.name}</h1>
					<div className="header__buttons">
						<button className="header__button">Play</button>
						<button className="header__button">My List</button>
					</div>
					<p className="header__overview">{movies?.overview}</p>
				</div>
				<div className="header--gradient" />
			</header>
		</div>
	);
};

export default Banner;
