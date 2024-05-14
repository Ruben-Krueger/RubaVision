import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { Center, Loader } from '@mantine/core';

export default function PrivateRoute({
	path,
	element
}: {
	path: string;
	element: React.ReactNode;
}): JSX.Element {
	const auth = getAuth();

	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setIsLoading(false);
			setUser(user);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<Center>
					<Loader color="blue" />
				</Center>
			) : user != null ? (
				<Route path={path}>{element}</Route>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
}
