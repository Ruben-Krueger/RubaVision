import {
  Button,
  Center,
  Text,
  Container,
  Flex,
  Paper,
  Space,
  ActionIcon,
  AppShell,
  Group,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';
import { IconAdjustments } from '@tabler/icons-react';

export default function Start() {
  const history = useHistory();

  const [GAME_MODE] = useLocalStorage({
    key: 'game-mode',
    defaultValue: GameMode.MOTION,
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          RubaVision
          <Button onClick={() => history.push('/play')}>PLAY</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Footer p="md">
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={() => history.push('/settings')}
          >
            <IconAdjustments
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </AppShell.Footer>
      </AppShell.Navbar>
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
                  -{' '}
                  {formatGameMode(GAME_MODE ?? GameMode.MOTION, 'description')}
                </Text>
                <Text>
                  -{' '}
                  {formatGameMode(GAME_MODE ?? GameMode.MOTION, 'instructions')}
                </Text>

                <Text>- Click "PLAY" to begin</Text>
                <Text>- Press "q" to end the game</Text>
              </Paper>
            </Flex>
          </Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
