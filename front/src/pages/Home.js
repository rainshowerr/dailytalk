import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
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

	const handleLogout = () => {
		// 로그아웃 시 쿠키 삭제 및 상태 업데이트
		axios
			.post('http://localhost:4000/auth/logout', null, {
				withCredentials: true,
			})
			.then((res) => {
				setIsLoggedIn(false);
				navigate('/');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="Home">
			<h2>Daily talk</h2>
			{isLoggedIn ? (
				<button type="button" className="btn" onClick={handleLogout}>
					logout
				</button>
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
