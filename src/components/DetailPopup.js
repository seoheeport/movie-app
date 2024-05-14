import { useEffect, useState } from 'react'
import styles from "../assets/css/Popup.module.css"
import RatingCircle from './RatingCircle'
import { IoArrowBack } from "react-icons/io5";

function DetailPopup({ detailId, onClose }) {
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(true);
	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(()=>{
		const getMovie = async() => {
			const json = await(
				await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${detailId}`)
			).json();
			setMovie(json.data.movie);
			setLoading(false);
		};
		getMovie();
	},[detailId]);

	useEffect(() => {
		document.body.style.cssText = `overflow:hidden`
		return () =>{
			document.body.style.cssText = `overflow:visible`
		}
		// document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
		// return () => {
		// 	const scrollY = document.body.style.top
		// 	document.body.style.cssText = `position: ""; top: "";`
		// 	window.scrollTo(0, parseInt(scrollY || '0') * -1)
		// }
	}, [])

	const onImgLoaded = ()=>{
		setImgLoaded(true);
	}
	
	return (
		<div
			className={`${styles.popup} ${loading ? styles.loading : styles.loaded}`}
		>
			<div className={styles.popup_header}><button onClick={onClose}><IoArrowBack /></button></div>
			<div className={`${styles.back_dim} ${loading ? styles.loading : styles.loaded}`}>
				<img src={imgLoaded?movie.large_cover_image:movie.medium_cover_image} alt={movie.title} />
				<img src={movie.large_cover_image} onLoad={()=>{onImgLoaded()}} style={{display:"none"}} alt={movie.title} />
			</div>
			<div className={styles.inner_wrap}>
				<div className={styles.inner}>
					<h3 className={styles.tlt}>{movie.title_long}</h3>
					<p className={styles.txt}>{movie.year}</p>
					{movie.runtime>0 &&
						<p className={styles.txt}>Runtime : {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min </p>
					}
					<p className={styles.txt}>{movie.genres?.map(g=><span key={g} className={styles.tag}>{g}</span>)}</p>
					<p className={styles.desc}>{movie.description_full}</p>
				</div>
				<div className={styles.circle_rating}>
					<svg>
						<circle r="24" cx="50%" cy="50%" stroke="#ddd" fill="transparent" strokeWidth="4" strokeLinecap="round" strokeDasharray="150.7964" strokeDashoffset="0" />
						{!loading&&
							<RatingCircle r="24" cx="50%" cy="50%" stroke="#0141cb" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="150.7964" $movieRating={movie.rating} />
						}
					</svg>
					<p className={styles.rating}>{movie.rating}</p>
				</div>
			</div>
		</div>
	)
}

export default DetailPopup