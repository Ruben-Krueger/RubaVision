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
import React, { useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';

export default function Start() {
  const history = useHistory();

  const [HAS_EMOTIONAL_STIMULI] = useLocalStorage({
    key: 'emotional-stimuli',
    defaultValue: false,
  });

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Center>
            <Text size="xl">RubaVision</Text>
          </Center>

          <Paper>
            <Text>Game play:</Text>
            {HAS_EMOTIONAL_STIMULI ? (
              <>
                <Text>- Emotional images (happy or sad) will be displayed</Text>
                <Text>
                  - Use the "h" and "s" keys to guess whether the image is happy
                  (h) or sad (s)
                </Text>
              </>
            ) : (
              <>
                <Text>
                  - Black circles will be moving left or right (with random
                  vertical motion)
                </Text>
                <Text>
                  - Use the left and right arrows to guess whether it is left or
                  right
                </Text>
              </>
            )}

            <Text>- Click "START" to begin</Text>
            <Text>- Press "q" to end the game</Text>
          </Paper>

          <Space h="lg" />

          <Flex gap="md" direction="column">
            <Button onClick={() => history.push('/play')}>START</Button>
            <Button color="gray" onClick={() => history.push('/settings')}>
              SETTINGS
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
