import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../App';

const Logout = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();

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
		<div>
			<button type="button" className="btn" onClick={handleLogout}>
				logout
			</button>
		</div>
	);
};

export default Logout;
