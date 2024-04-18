import Header from './Header'

const Main = (props) => {
	return (
		<>
			<Header />
			<main className='main' role='main'>
				{props.children}
			</main>
		</>
	)
}

export default Main