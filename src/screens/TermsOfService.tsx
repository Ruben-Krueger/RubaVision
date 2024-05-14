import { Button, Text, Container, AppShell, Group } from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import RVFooter from '../components/RVFooter';

export default function Start() {
	const history = useHistory();

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					RubaVision
					<Button onClick={() => history.push('/play')}>PLAY</Button>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<Container>
					<Text>Terms of Service</Text>
				</Container>
			</AppShell.Main>
			<RVFooter />
		</AppShell>
	);
}
