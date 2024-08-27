import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
	const id = useParams().id;
	const [nick, setNick] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [createdAt, setCreatedAt] = useState('');

	useEffect(() => {
		axios
			.get(`http://localhost:4000/post/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				setNick(res.data.User.nick);
				setTitle(res.data.title);
				setContent(res.data.content);
				setCreatedAt(res.data.createdAt);
			})
			.catch((error) => {
				console.error('There was an error fetching the data!', error);
			});
	}, []);
	return (
		<div className="Home">
			<h2>Daily talk</h2>
			<div>{title}</div>
			<div>{nick}</div>
			<div>{createdAt}</div>
			<div>{content}</div>
		</div>
	);
};

export default Post;
