import {
  Button,
  Center,
  Text,
  Container,
  Flex,
  Modal,
  Paper,
  Space,
  Box,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocalStorage, useTimeout } from '@mantine/hooks';
import { Ping } from '@uiball/loaders';

export default function Start() {
  const history = useHistory();

  const [HAS_EMOTIONAL_STIMULI] = useLocalStorage({
    key: 'emotional-stimuli',
    defaultValue: false,
  });

  const [showLoading, setShowLoading] = useState(true);

  const { start, clear } = useTimeout(() => setShowLoading(false), 2000, {
    autoInvoke: true,
  });

  if (showLoading)
    return (
      <Center>
        <Flex>
          <Ping size={100} speed={2} color="blue" />
        </Flex>
      </Center>
    );

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">RubaVision</Text>

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
