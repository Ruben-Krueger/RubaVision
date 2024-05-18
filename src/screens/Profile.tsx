import React, { useEffect, useState } from 'react';
import {
	Text,
	Container,
	AppShell,
	Center,
	Paper,
	Button
} from '@mantine/core';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';
import { getAuth } from 'firebase/auth';

export default function Profile() {
	const auth = getAuth();

	const [displayName, setDisplayName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		const user = auth.currentUser;
		if (user != null) {
			// The user object has basic properties such as display name, email, etc.
			setDisplayName(user.displayName);
			setEmail(user.email);
		}
	}, []);

	async function signOut() {
		await auth.signOut();
	}

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<RVHeader />
			<AppShell.Main>
				<Container>
					<Center>
						<Text size="xl">Profile</Text>
					</Center>
					<Text>{email}</Text>

					<Text>{displayName}</Text>

					<Center>
						<Button bg="gray" onClick={signOut}>
							SIGN OUT
						</Button>
					</Center>
				</Container>
			</AppShell.Main>
			<RVFooter />
		</AppShell>
	);
}
