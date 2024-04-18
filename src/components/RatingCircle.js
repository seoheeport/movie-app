import styled, { css } from 'styled-components'

// Movie Rating Circle
const radiusSize = 2 * 24 * Math.PI; // radius = 24
const RatingAni = styled.circle`
	${prop => prop.$movieRating&&
		css`
			animation:1.5s ratingAniKeyframes ease-out forwards;
			@keyframes ratingAniKeyframes{
				0%{stroke-dashoffset:${radiusSize}}
				100%{stroke-dashoffset: ${(radiusSize * (1 - Number(prop.$movieRating) * 0.1).toFixed(2)).toFixed(4)}}
			}`
	}
`
function RatingCircle({ ...props }){
	return <RatingAni { ...props }/>
}

export default RatingCircle