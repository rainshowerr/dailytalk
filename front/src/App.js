import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Write from './pages/Write';
import Post from './pages/Post';
import Page from './pages/Page';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

export const UserContext = createContext();
export const LoginContext = createContext();

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	return (
		<BrowserRouter>
			<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<UserContext.Provider value={user}>
					<div className="App">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/join" element={<Join />} />
							<Route path="/login" element={<Login />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/write" element={<Write />} />
							<Route path="/post/:id" element={<Post />} />
							<Route path="/page/:id" element={<Page />} />
							<Route path="*" element={<Error />} />
						</Routes>
					</div>
				</UserContext.Provider>
			</LoginContext.Provider>
		</BrowserRouter>
	);
}

export default App;
