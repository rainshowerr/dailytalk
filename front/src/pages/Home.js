import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//const [data, setData] = useState('');

	useEffect(() => {
		// axios
		// 	.get('http://localhost:4000/')
		// 	.then((res) => {
		// 		setData(res.data);
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});

		// 쿠키가 있는지 확인하는 함수
		const checkCookie = () => {
			const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('connect.sid='));
			console.log(document.cookie);
			setIsLoggedIn(cookieExists);
		};

		// 컴포넌트가 처음 렌더링될 때 쿠키를 확인
		checkCookie();
	}, []);

	const handleLogout = () => {
		// 로그아웃 시 쿠키 삭제 및 상태 업데이트
		axios
			.post('http://localhost:4000/auth/logout')
			.then((res) => {
				console.log(res);
				setIsLoggedIn(false);
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
				<button onClick={() => (window.location.href = 'http://localhost:3000/login/')}>Login</button>
			)}
		</div>
	);
};

export default Home;
