import { useState, useEffect } from 'react';
import styles from "../assets/css/MovieCard.module.css"

function MovieCard({ onDetail }){
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const getMovies = async() =>{
		const json = await (
			await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year`)
		).json();
		
		setMovies(json.data.movies);
		setLoading(false);
	}
	useEffect(()=>{
		getMovies();
	},[])

	return(
		<ul className={styles.card_thumb}>
			{loading&&
				<>
					<li className={styles.skeleton}>
						<div className={styles.inner}></div>
						<p className={styles.inner_txt}></p>
						<p className={styles.inner_txt}></p>
					</li>
					<li className={styles.skeleton}>
						<div className={styles.inner}></div>
						<p className={styles.inner_txt}></p>
						<p className={styles.inner_txt}></p>
					</li>
					<li className={styles.skeleton}>
						<div className={styles.inner}></div>
						<p className={styles.inner_txt}></p>
						<p className={styles.inner_txt}></p>
					</li>
				</>
			}
			{movies.map((movie) =>
				<li key={movie.id}>
					<div className={styles.card} onClick={()=>onDetail(movie.id)}>
						<div className={styles.thumb_wrap}>
							<img src={movie.medium_cover_image} alt={movie.title} loading="lazy" />
						</div>
						<h2 className={styles.tlt}>{movie.title.length > 50? `${movie.title.slice(0, 50)}...`: movie.title}</h2>
					</div>
					<div>{movie.genres?.map(g=><span key={g} className={styles.tag}>{g}</span>)}</div>
				</li>
			)}
		</ul>
	)
}
export default MovieCard;