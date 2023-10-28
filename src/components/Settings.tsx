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
  Button,
  NumberInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useMove } from '@mantine/hooks';
import { useLocalStorage } from '@mantine/hooks';
import { useHistory } from 'react-router-dom';
import useLogger from '../util/useLogger';

function CoordinateBox() {
  const width = window.innerWidth / 5;
  const height = window.innerHeight / 5;

  const [value, setValue] = useLocalStorage({
    key: 'target-center',
    defaultValue: { x: 0, y: 0 },
  });

  // TODO(remember to update the parsing)
  const [values, setValues] = useLocalStorage({
    key: 'target-center',
    defaultValue: [{ x: 0, y: 0 }],
  });

  const [hasMovingTargetCenter, setHasMovingTargetCenter] = useLocalStorage({
    key: 'has-moving-target-center',
    defaultValue: true,
  });

  const x = Math.round((value?.x ?? 0) * window.innerWidth);
  const y = Math.round((value?.y ?? 0) * window.innerHeight);

  const { ref, active } = useMove(setValue);

  const disabled = hasMovingTargetCenter;

  return (
    <Container>
      <Checkbox
        label="Alternate the target center"
        checked={hasMovingTargetCenter}
        onChange={(event) => {
          setHasMovingTargetCenter(event.target.checked);
        }}
        description={
          hasMovingTargetCenter
            ? 'Uncheck this to manually set a target center below'
            : 'Check this to randomly move target centers'
        }
      />

      <Space h="xl" />

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
            <>
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
              {/* {values?.map((v) => (
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${(v?.x ?? 0) * 100}% - ${rem(8)})`,
                    top: `calc(${(v?.y ?? 0) * 100}% - ${rem(8)})`,
                    width: rem(16),
                    height: rem(16),
                    backgroundColor: active
                      ? 'var(--mantine-color-teal-7)'
                      : 'var(--mantine-color-blue-7)',
                  }}
                />
              ))} */}
            </>
          )}
        </div>
      </Group>
      {!disabled && (
        <Text ta="center" mt="sm">
          x: {x} y: {y}
        </Text>
      )}

      {/* <Button color="orange">Add target</Button>
      <Button color="grey">Remove target</Button> */}
    </Container>
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

  const [hasEmotionalStimuli, setHasEmotionalStimuli] = useLocalStorage({
    key: 'emotional-stimuli',
    defaultValue: false,
  });

  const [hasCountdown, setHasCountdown] = useLocalStorage({
    key: 'countdown',
    defaultValue: false,
  });

  const history = useHistory();

  const logger = useLogger();

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>

          <Space h="xl" />

          <Text size="lg">Rounds</Text>
          <Text size="md" fs="italic">
            The number of guesses per game (between 1 to 1000)
          </Text>
          <NumberInput
            placeholder="10"
            min={1}
            max={1000}
            value={numberOfRounds}
            onChange={(v) => setNumberOfRounds(v as number)}
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
              { value: 3, label: '3' },
              { value: 5, label: '5' },
            ]}
          />

          <Space h="xl" />

          <Text size="lg">Target position</Text>

          <CoordinateBox />

          <Space h="xl" />

          <Text size="lg">Emotional stimuli</Text>
          <Text size="md" fs="italic">
            Include emotional stimuli
          </Text>
          <Checkbox
            label="Emotional stimuli"
            checked={hasEmotionalStimuli}
            onChange={(event) => setHasEmotionalStimuli(event.target.checked)}
            description={
              hasEmotionalStimuli
                ? 'Uncheck to use moving circles'
                : 'Check this to use emotional stimuli'
            }
          />

          <Space h="xl" />

          <Button onClick={() => history.push('/play')}>PLAY</Button>
        </Flex>
      </Center>
    </Container>
  );
}
