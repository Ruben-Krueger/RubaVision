import {
  Text,
  Container,
  Center,
  Flex,
  Slider,
  Space,
  Group,
  rem,
  Checkbox,
} from '@mantine/core';
import React from 'react';
import { useMove } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';

function CoordinateBox({ disabled }: { disabled: boolean }) {
  const width = window.innerWidth / 5;
  const height = window.innerHeight / 5;

  const [value, setValue] = useLocalStorage({
    key: 'coordinate-position',
    defaultValue: { x: 0, y: 0 },
  });

  const { ref, active } = useMove(setValue);

  const x = Math.round((value?.x ?? 0) * window.innerWidth);
  const y = Math.round((value?.y ?? 0) * window.innerHeight);

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
          {!disabled && (
            <div
              style={{
                position: 'absolute',
                left: `calc(${(value?.x ?? 0) * 100}% - ${rem(8)})`,
                top: `calc(${(value?.y ?? 0) * 100}% - ${rem(8)})`,
                width: rem(16),
                height: rem(16),
                backgroundColor: active
                  ? 'var(--mantine-color-teal-7)'
                  : 'var(--mantine-color-blue-7)',
              }}
            />
          )}
        </div>
      </Group>
      {!disabled && (
        <Text ta="center" mt="sm">
          x: {x} y: {y}
        </Text>
      )}
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

  const [hasMovingTargetCenter, setHasMovingTargetCenter] = useLocalStorage({
    key: 'has-moving-target-center',
    defaultValue: false,
  });

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>

          <Space h="xl" />

          <Text size="lg">Rounds</Text>
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

          <Text size="lg">Round length</Text>
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

          <Text size="lg">Target position</Text>

          <Space h="xl" />

          <Text size="md" fs="italic">
            Alternate targets
          </Text>

          <Checkbox
            defaultChecked
            label="Alternate the target center"
            value={hasMovingTargetCenter ? 'checked' : 'unchecked'}
            onChange={(event) => setHasMovingTargetCenter(event.target.checked)}
            description={
              hasMovingTargetCenter
                ? 'Uncheck this to manually set a target center below'
                : 'Check this to randomly move target centers'
            }
          />

          <Space h="xl" />

          <Text size="md" fs="italic">
            Screen location for targets
          </Text>

          <CoordinateBox disabled={hasMovingTargetCenter ?? false} />
        </Flex>
      </Center>
    </Container>
  );
}
