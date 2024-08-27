import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				'http://localhost:4000/auth/login',
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
				}
			);
			navigate('/');
		} catch (error) {
			console.error('로그인 에러', error);
		}
	};

	return (
		<div className="Login">
			<h2>Daily talk</h2>
			<h3>로그인 페이지입니다.</h3>
			<form id="login-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="join-email">이메일</label>
					<input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div className="input-group">
					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button id="login-btn" type="submit" className="btn">
					로그인
				</button>
			</form>
		</div>
	);
};

export default Login;
