import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';
import Logout from '../components/Logout';

const Home = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [data, setData] = useState('');

	useEffect(() => {
		// 쿠키가 있는지 확인하는 함수
		const checkCookie = () => {
			const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('connect.sid='));
			setIsLoggedIn(cookieExists);
		};

		// 컴포넌트가 처음 렌더링될 때 쿠키를 확인
		checkCookie();
	}, []);

	return (
		<div className="Home">
			<h2>Daily talk</h2>
			{isLoggedIn ? (
				<Logout />
			) : (
				<button
					type="button"
					className="btn"
					onClick={() => (window.location.href = 'http://localhost:3000/login/')}
				>
					Login
				</button>
			)}
			<br />
			<button
				type="button"
				className="btn"
				onClick={() => (window.location.href = 'http://localhost:3000/page/1')}
			>
				접속하기
			</button>
		</div>
	);
};

export default Home;
