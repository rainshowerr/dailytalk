import { useState, useEffect } from 'react';
import axios from 'axios';

const PageNavigator = ({ pageId }) => {
	const [validPages, setValidPages] = useState(new Set());
	const [meanPageId, setMeanPageId] = useState(Math.floor(parseInt(pageId - 1) / 5) * 5 + 1);

	useEffect(() => {
		const isPageVaild = async (checkPageId) => {
			let postNum;
			return axios
				.get(`http://localhost:4000/page/${checkPageId}`, {
					withCredentials: true,
				})
				.then((res) => {
					postNum = res.data.length;
					return postNum > 0;
				})
				.catch((error) => {
					console.error('페이지 네비게이터 에러', error);
				});
		};

		const verifyPages = async () => {
			const pageIds = [
				meanPageId - 1,
				meanPageId,
				meanPageId + 1,
				meanPageId + 2,
				meanPageId + 3,
				meanPageId + 4,
				meanPageId + 5,
			];

			const validPageSet = new Set();

			for (const pageId of pageIds) {
				if (pageId > 0) {
					const isValid = await isPageVaild(pageId);
					if (isValid) {
						validPageSet.add(pageId);
					}
				}
			}
			setValidPages(validPageSet);
		};

		verifyPages();
	}, [meanPageId]);

	return (
		<div>
			{Array.from(validPages).map((pageId) => (
				<button
					key={pageId}
					type="button"
					className="btn"
					onClick={() => (window.location.href = `http://localhost:3000/page/${pageId}`)}
				>
					{pageId >= meanPageId ? (pageId > meanPageId + 4 ? '▶︎▶︎' : pageId) : '◀︎◀︎'}
				</button>
			))}
		</div>
	);
};

export default PageNavigator;
