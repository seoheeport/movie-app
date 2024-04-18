import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";

function Header() {
	const location = useLocation()
	return (
		<header
			className={location.pathname === `${process.env.PUBLIC_URL}/`? 'header' : 'sub_header'}
		>
			<Link to={`${process.env.PUBLIC_URL}/`} className="go_home"><MdLocalMovies /><span>Movie</span></Link>
		</header>
	)
}

export default Header