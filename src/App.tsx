import '@mantine/core/styles.css';
import { MantineProvider, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './screens/Start';
import React, { Suspense } from 'react';
import Settings from './screens/Settings';
import Canvas from './screens/Canvas';
import PageNotFound from './screens/PageNotFound';
import End from './screens/End';
import RVErrorBoundary from './components/RVErrorBoundary';
import Login from './screens/Login';

import PrivateRoute from './PrivateRoute';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import About from './screens/About';
import TermsOfService from './screens/TermsOfService';
import Home from './screens/Home';
import Profile from './screens/Profile';

function App(): JSX.Element {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<MantineProvider>
				<Suspense fallback={<Loader />}>
					<Switch>
						{/* Public routes */}
						<Route exact path="/">
							<RVErrorBoundary>
								<Home />
							</RVErrorBoundary>
						</Route>
						<Route path="/reset-password">
							<RVErrorBoundary>
								<ResetPassword />
							</RVErrorBoundary>
						</Route>
						<Route path="/login">
							<RVErrorBoundary>
								<Login />
							</RVErrorBoundary>
						</Route>
						<Route path="/register">
							<RVErrorBoundary>
								<Register />
							</RVErrorBoundary>
						</Route>
						{/* Protected routes (only accessible if logged in) */}
						<PrivateRoute
							path="/about"
							element={
								<RVErrorBoundary>
									<About />
								</RVErrorBoundary>
							}
						></PrivateRoute>
						<PrivateRoute
							path="/terms-of-service"
							element={
								<RVErrorBoundary>
									<TermsOfService />
								</RVErrorBoundary>
							}
						></PrivateRoute>

						<PrivateRoute
							path="/profile"
							element={
								<RVErrorBoundary>
									<Profile />
								</RVErrorBoundary>
							}
						></PrivateRoute>

						<PrivateRoute
							path="/start"
							element={
								<RVErrorBoundary>
									<Start />
								</RVErrorBoundary>
							}
						></PrivateRoute>
						<PrivateRoute
							path="/play"
							element={
								<RVErrorBoundary>
									<Canvas />
								</RVErrorBoundary>
							}
						></PrivateRoute>
						<PrivateRoute
							path="/end"
							element={
								<RVErrorBoundary>
									<End />
								</RVErrorBoundary>
							}
						></PrivateRoute>
						<PrivateRoute
							path="/settings"
							element={
								<RVErrorBoundary>
									<Settings />
								</RVErrorBoundary>
							}
						></PrivateRoute>
						<Route path="*" component={PageNotFound} />
					</Switch>
				</Suspense>
			</MantineProvider>
		</Router>
	);
}

export default App;
