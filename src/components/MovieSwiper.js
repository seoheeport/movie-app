import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from "../assets/css/MovieSwiper.module.css"

function MovieSwiper({ onDetail }){
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const getMovies = async() =>{
		/*
		const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
		const json = await response.json();
		*/
		const json = await (
			await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=2022`)
		).json();
		
		setMovies(json.data.movies);
		setLoading(false);
	}
	useEffect(()=>{
		getMovies();
	},[])
	/*
	useEffect(()=>{
		fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
		.then(res=>res.json())
		.then(json => {
			setMovies(json.data.movies);
			setLoading(false);
		})
	},[])
	*/
	return(
		<Swiper
				slidesPerView={1.3}
				spaceBetween={28}
				centeredSlides={true}
		>
		{loading&&
			<div className={styles.skeleton}>
				<div className={styles.inner}></div>
			</div>
		}
		{movies.map((movie) =>
			<SwiperSlide key={movie.id}>
				<div className={styles.card} onClick={()=> onDetail(movie.id)}>
					<div className={styles.thumb_wrap}>
						<img src={movie.medium_cover_image} alt={movie.title} loading="lazy" />
					</div>
					<h2 className={styles.tlt}>{movie.title.length > 50? `${movie.title.slice(0, 50)}...`: movie.title}</h2>
					<div>{movie.genres?.map(g=><span key={g} className={styles.tag}>{g}</span>)}</div>
				</div>
			</SwiperSlide>
		)}
		</Swiper>
		
	)
}

export default MovieSwiper;