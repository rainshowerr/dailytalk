import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageNavigator from '../components/Page/PageNavigator';
import Logout from '../components/Logout';

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
			<Logout />
			<button
				type="button"
				className="btn"
				onClick={() => (window.location.href = 'http://localhost:3000/write')}
			>
				글쓰기
			</button>

			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<a href={`http://localhost:3000/post/${post.id}`}>{post.title}</a>
						<p>By: {post.User.nick}</p>
						<p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
						<br />
					</li>
				))}
			</ul>
			<PageNavigator pageId={pageId} />
		</div>
	);
};

export default Page;
