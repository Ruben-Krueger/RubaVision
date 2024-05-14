import { AppShell, Button, Group } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RVHeader() {
	const history = useHistory();
	return (
		<AppShell.Header>
			<Group h="100%" px="md" justify="space-between">
				RubaVision
				<Button onClick={() => history.push('/play')} color="blue">
					PLAY
				</Button>
			</Group>
		</AppShell.Header>
	);
}
