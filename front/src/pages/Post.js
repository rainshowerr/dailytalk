import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
	const id = useParams().id;
	const [nick, setNick] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [createdAt, setCreatedAt] = useState('');
	const [comments, setComments] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/post/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setNick(res.data.User.nick);
				setTitle(res.data.title);
				setContent(res.data.content);
				setCreatedAt(res.data.createdAt);
			})
			.catch((error) => {
				console.error('글 내용을 불러오는 중 에러가 발생했습니다.', error);
			});
		axios
			.get(`http://localhost:4000/post/${id}/comment`)
			.then((res) => {
				setComments(res.data);
			})
			.catch((error) => {
				console.error('댓글 목록을 불러오는 중 에러가 발생했습니다.', error);
			});
	}, []);
	return (
		<div className="Home">
			<h2>Daily talk</h2>
			<div>{title}</div>
			<div>{nick}</div>
			<div>{new Date(createdAt).toLocaleString()}</div>
			<div>{content}</div>
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>
						<p>{comment.User.nick}</p>
						<p>{new Date(comment.createdAt).toLocaleString()}</p>
						<p>{comment.content}</p>
						<br />
					</li>
				))}
			</ul>
			<button type="button" onClick={() => window.history.back()}>
				목록으로
			</button>
		</div>
	);
};

export default Post;
