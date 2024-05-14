import {
  Button,
  Center,
  Text,
  Container,
  Flex,
  Paper,
  AppShell,
  Group,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';
import RVFooter from '../components/RVFooter';

export default function Start() {
  const history = useHistory();

  const [GAME_MODE] = useLocalStorage({
    key: 'game-mode',
    defaultValue: GameMode.MOTION,
  });

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
