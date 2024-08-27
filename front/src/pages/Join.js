import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
	const [loginStatus, setLoginStatus] = useState('F');
	const [email, setEmail] = useState('');
	const [nick, setNick] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// useEffect(async () => {
	// 	axios.get('http://localhost:4000/join').then((res) => {
	// 		setLoginStatus('T');
	// 		if (loginStatus === 'T') navigate('/');
	// 	});
	// }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:4000/auth/join', {
				email: email,
				nick: nick,
				password: password,
			});
			window.location.href = 'http://localhost:3000/';
		} catch (error) {
			console.error('회원가입 에러', error);
		}
	};

	return (
		<div className="Join">
			<h2>Daily talk</h2>
			<h3>회원가입 페이지입니다.</h3>
			<form id="join-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="join-email">이메일</label>
					<input
						id="join-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="join-nick">닉네임</label>
					<input id="join-nick" type="text" value={nick} onChange={(e) => setNick(e.target.value)} required />
				</div>
				<div className="input-group">
					<label htmlFor="join-password">비밀번호</label>
					<input
						id="join-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button id="join-btn" type="submit" className="btn">
					회원가입
				</button>
			</form>
		</div>
	);
};

export default Join;
