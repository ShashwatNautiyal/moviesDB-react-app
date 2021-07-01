import React, { useEffect, useState } from 'react';
import './Nav.css';

const Nav = () => {
	const [handleShow, setHandleShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				setHandleShow(true);
			} else {
				setHandleShow(false);
			}
		});

		return () => {
			window.removeEventListener('scroll');
		};
	}, []);

	return (
		<div className={`nav ${handleShow && 'nav__black'}`}>
			<img
				className="nav__logo"
				src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
				alt=""
			/>
			<img
				className="nav__avatar"
				src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
				alt=""
			/>
		</div>
	);
};

export default Nav;
