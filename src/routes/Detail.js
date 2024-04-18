import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Main from '../layout/Main';
import RatingCircle from '../components/RatingCircle'

import styles from "../assets/css/Popup.module.css"

function Detail() {
	const { id } = useParams(); // :id 변수 받아옴
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(()=>{
		const getMovie = async() => {
			const json = await(
				await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
			).json();
			setMovie(json.data.movie);
			setLoading(false);
		};
		getMovie();
	},[id])
	return (
		<Main>
			<div className={`${styles.popup} ${styles.loaded}`}>
				{loading&&
					<div className={styles.skeleton}>
						<div className={styles.inner}></div>
					</div>
				}
				
				<div className={`${styles.back_dim} ${loading ? styles.loading : styles.loaded}`}>
					<img src={movie.large_cover_image} alt={movie.title} />
				</div>
				<div className={`${styles.inner_wrap} ${styles.inner_wrap_sub}`}>
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
		</Main>
	)
}

export default Detail