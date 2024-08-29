import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Write = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('connect.sid='));

		if (!isLoggedIn) {
			navigate('/login');
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				'http://localhost:4000/write',
				{
					title,
					content,
				},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				navigate('/page/1');
			}
		} catch (err) {
			console.error(err);
			setError('업로드에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<div className="Write">
			<h2>글쓰기</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">제목</label>
					<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>
				<div>
					<label htmlFor="content">내용</label>
					<textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
				</div>
				<button type="submit">작성하기</button>
			</form>
		</div>
	);
};

export default Write;
