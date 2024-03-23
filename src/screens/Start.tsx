import {
  Button,
  Center,
  Text,
  Container,
  Flex,
  Paper,
  Space,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';

console.log('sdjhads ');
export default function Start() {
  const history = useHistory();

  console.log('x0');

  const [GAME_MODE] = useLocalStorage({
    key: 'game-mode',
    defaultValue: GameMode.STANDARD,
  });
  console.log('x1');

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Center>
            <Text size="xl">RubaVision</Text>
          </Center>

          <Paper>
            <Text fw={700}>
              Current game mode:{' '}
              {formatGameMode(GAME_MODE ?? GameMode.STANDARD, 'title')}
            </Text>
            <Text>Game play:</Text>

            <Text>
              - {formatGameMode(GAME_MODE ?? GameMode.STANDARD, 'description')}
            </Text>
            <Text>
              - {formatGameMode(GAME_MODE ?? GameMode.STANDARD, 'instructions')}
            </Text>

            <Text>- Click "PLAY" to begin</Text>
            <Text>- Press "q" to end the game</Text>
          </Paper>

          <Space h="lg" />

          <Flex gap="md" direction="column">
            <Button onClick={() => history.push('/play')}>PLAY</Button>
            <Button color="gray" onClick={() => history.push('/settings')}>
              SETTINGS
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
