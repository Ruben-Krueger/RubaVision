import {
	Button,
	Center,
	Text,
	Container,
	Flex,
	Paper,
	AppShell
} from '@mantine/core';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';

export default function Start() {
	const [GAME_MODE] = useLocalStorage({
		key: 'game-mode',
		defaultValue: GameMode.MOTION
	});

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<RVHeader />
			<AppShell.Main>
				<Container>
					<Center>
						<Flex direction="column">
							<Center>
								<Text size="xl">Start</Text>
							</Center>

							<Paper>
								<Text fw={700}>
									Current game mode:{' '}
									{formatGameMode(GAME_MODE ?? GameMode.MOTION, 'title')}
								</Text>
								<Text>Game play:</Text>

								<Text>
									-{formatGameMode(GAME_MODE ?? GameMode.MOTION, 'description')}
								</Text>
								<Text>
									-{' '}
									{formatGameMode(GAME_MODE ?? GameMode.MOTION, 'instructions')}
								</Text>

								<Text>- Click PLAY to begin</Text>
								<Text>- Press &quot;q&quot; to end the game</Text>
							</Paper>
						</Flex>
					</Center>
				</Container>
			</AppShell.Main>
			<RVFooter />
		</AppShell>
	);
}
