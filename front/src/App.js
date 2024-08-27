import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
	const [user, setUser] = useState(null);
	return (
		<BrowserRouter>
			<UserContext.Provider value={user}>
				<div className="App">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/join" element={<Join />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
