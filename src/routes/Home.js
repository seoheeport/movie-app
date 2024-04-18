import { useState } from 'react';
import Main from '../layout/Main';
import MovieCard from "../components/MovieCard"
import MovieSwiper from "../components/MovieSwiper"
import DetailPopup from "../components/DetailPopup"

function Home() {
	const [layerPop, setLayerPop] = useState(false);
	const [detailId, setDetailId] = useState(0);

	const onDetail = (id) =>{
		setDetailId(id);
		setLayerPop(true);
	}
	const onClose = () => setLayerPop(false)

  return (
    <Main>
			<MovieSwiper onDetail={onDetail} />
			<MovieCard onDetail={onDetail} />
			{layerPop && <DetailPopup detailId={detailId} onClose={onClose} />}
    </Main>
  );
}

export default Home