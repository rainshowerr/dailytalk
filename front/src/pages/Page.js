import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageNavigator from '../components/Page/PageNavigator';

const Page = () => {
	const pageId = useParams().id;
	let postNum;
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/page/${pageId}`, {
				withCredentials: true,
			})
			.then((res) => {
				setPosts(res.data);
				postNum = res.data.length;
			})
			.catch((error) => {
				console.error('글 목록을 불러오는 중 에러가 발생했습니다.', error);
			});
	}, []);
	return (
		<div>
			<h1>Post List</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<h2>{post.title}</h2>
						<p>By: {post.User.nick}</p>
						<p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
						<br />
					</li>
				))}
			</ul>
			<PageNavigator pageId />
		</div>
	);
};

export default Page;
