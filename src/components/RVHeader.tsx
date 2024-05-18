import { Anchor, AppShell, Button, Group } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RVHeader({ playable = true }: { playable?: boolean }) {
	const history = useHistory();
	return (
		<AppShell.Header>
			<Group h="100%" px="md" justify="space-between">
				<Anchor href="/" c="black">
					RubaVision
				</Anchor>
				{playable && (
					<Button onClick={() => history.push('/play')} color="blue">
						PLAY
					</Button>
				)}
			</Group>
		</AppShell.Header>
	);
}
