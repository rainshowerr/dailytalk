import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
	const [email, setEmail] = useState('');
	const [nick, setNick] = useState('');
	useEffect(() => {
		axios
			.get('http://localhost:4000/profile')
			.then((res) => {
				console.log(res);
				//setData(res.data.email);
				//setData(res.data.nick);
			})
			.catch((error) => {
				console.error('There was an error fetching the data!', error);
			});
	}, [email, nick]);
	return (
		<div className="Home">
			<h2>Daily talk</h2>
			<div>{email}</div>
			<div>{nick}</div>
		</div>
	);
};

export default Profile;
