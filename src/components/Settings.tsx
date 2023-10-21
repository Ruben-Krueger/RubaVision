import {
  Text,
  Container,
  Center,
  Flex,
  Slider,
  Space,
  Group,
  rem,
} from '@mantine/core';
import React, { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';

function CoordinateBox() {
  /*

  TODO: 
    1. get the settings value
    2. 

  */

  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  const width = 100;
  const height = 100;

  console.log(width, height);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width,
            height,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${value.x * 100}% - ${rem(8)})`,
              top: `calc(${value.y * 100}% - ${rem(8)})`,
              width: rem(16),
              height: rem(16),
              backgroundColor: active
                ? 'var(--mantine-color-teal-7)'
                : 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values {value.x} {value.y}
      </Text>
    </>
  );
}

export default function Settings(): JSX.Element {
  const [numberOfRounds, setNumberOfRounds] = useLocalStorage({
    key: 'number-rounds',
    defaultValue: 5,
  });

  const [roundLength, setRoundLength] = useLocalStorage({
    key: 'round-length',
    defaultValue: 1,
  });

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>

          <Space h="xl" />

          <Text size="md">Rounds</Text>
          <Text size="md" fs="italic">
            The number of guesses per game
          </Text>
          <Slider
            min={1}
            max={10}
            defaultValue={5}
            label={numberOfRounds}
            value={numberOfRounds}
            onChange={(value) => setNumberOfRounds(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />

          <Space h="xl" />

          <Text size="md">Round length</Text>
          <Text size="md" fs="italic">
            The amount of time per each round in seconds.
          </Text>
          <Slider
            min={1}
            max={5}
            defaultValue={5}
            label={roundLength}
            value={roundLength}
            onChange={(value) => setRoundLength(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 2.5, label: '2.5' },
              { value: 5, label: '5' },
            ]}
          />

          <Space h="xl" />

          <Text size="md">Target position</Text>
          <Text size="md" fs="italic">
            Screen location for targets
          </Text>

          <CoordinateBox />
        </Flex>
      </Center>
    </Container>
  );
}
