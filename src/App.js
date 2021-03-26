import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Loader } from './components/Loader';
import { useRoutes } from './hooks/routes.hook';


function App() {
	const { token, refreshToken, login, logout, userId, ready, userName } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated);

	if (!ready) {
		return <Loader />;
	}

	return (
		<AuthContext.Provider
			value={{
				token,
        refreshToken,
				login,
				logout,
				userId,
				isAuthenticated,
				userName
			}}
		>
			<BrowserRouter>
				<div className="app">{routes}</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;

