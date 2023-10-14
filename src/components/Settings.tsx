import { Text, Container, Center, Flex, Slider, Space } from '@mantine/core';
import React, { useState } from 'react';

export default function Settings(): JSX.Element {
  const [speed, setSpeed] = useState(5);

  const [roundLength, setRoundLength] = useState(2);

  const [jitter, setJitter] = useState(2);

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>
          <Text size="lg">
            This isn't implemented yet (i.e., adjusting these does not affect
            gameplay), but some possibilities are:
          </Text>

          <Space h="xl" />

          <Text size="md">Speed</Text>
          <Text size="md" fs="italic">
            The horizontal velocity of the targets
          </Text>
          <Slider
            min={1}
            max={10}
            defaultValue={5}
            label={speed}
            value={speed}
            onChange={(value) => setSpeed(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />

          <Space h="xl" />

          <Text size="md">Round length (seconds)</Text>
          <Text size="md" fs="italic">
            The amount of time to guess a direction
          </Text>
          <Slider
            min={1}
            max={10}
            defaultValue={5}
            label={roundLength}
            value={roundLength}
            onChange={(value) => setRoundLength(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />

          <Space h="xl" />

          <Text size="md">Jitter</Text>
          <Text size="md" fs="italic">
            The random vertical motion of targets
          </Text>
          <Slider
            min={1}
            max={10}
            defaultValue={5}
            label={jitter}
            value={jitter}
            onChange={(value) => setJitter(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />
        </Flex>
      </Center>
    </Container>
  );
}
