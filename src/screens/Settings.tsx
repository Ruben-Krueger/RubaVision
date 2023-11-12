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
  Select,
} from '@mantine/core';
import React, { useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { useHistory } from 'react-router-dom';
import useLogger from '../util/useLogger';

import update, { Spec } from 'immutability-helper';

import { Table } from '@mantine/core';
import nullThrows from 'capital-t-null-throws';
import Position from '../types/Position';
import { v4 as uuidv4 } from 'uuid';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';

function CoordinateBox() {
  const width = window.innerWidth / 5;
  const height = window.innerHeight / 5;

  // TODO(remember to update the parsing)
  const [values, setValues] = useLocalStorage({
    key: 'target-centers',
    defaultValue: [] as Position[],
  });

  console.log(values);

  const [hasMovingTargetCenter, setHasMovingTargetCenter] = useLocalStorage({
    key: 'has-moving-target-center',
    defaultValue: true,
  });

  // const x = Math.round((value?.x ?? 0) * window.innerWidth);
  // const y = Math.round((value?.y ?? 0) * window.innerHeight);

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
          style={{
            width,
            height,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          {!disabled && (
            <>
              {values?.map((v) => (
                <div
                  key={v.id ?? `${v.x},${v.y}`}
                  style={{
                    position: 'absolute',
                    left: `calc(${(v?.x ?? 0) * 100}% - ${rem(8)})`,
                    top: `calc(${(v?.y ?? 0) * 100}% - ${rem(8)})`,
                    width: rem(16),
                    height: rem(16),
                    backgroundColor: 'var(--mantine-color-blue-7)',
                  }}
                />
              ))}
            </>
          )}
        </div>
      </Group>

      {!disabled && (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Coordinates</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {values?.map((value, i) => (
                <Table.Tr key={value.id}>
                  <Table.Td>
                    ({value.x}, {value.y})
                  </Table.Td>
                  <Table.Td>
                    <Button
                      color="red"
                      onClick={() => {
                        console.log('before', values);
                        // setValues((previous) => {
                        //   const newValue = previous.slice(i, ) + previous.slice(i, i1);
                        //   console.log('new value', newValue);
                        //   return newValue;
                        // });
                        // setValues((previousValues) =>
                        //   update(previousValues, {
                        //     items: { $splice: [[i, 1]] } as Spec<
                        //       Position,
                        //       never
                        //     >,
                        //   })
                        // );

                        // setValues((previousValues) => {
                        //   const start = Math.min(0, i - 1);
                        //   return previousValues
                        //     .slice(0, start)
                        //     .concat(
                        //       previousValues.slice(i + 1, previousValues.length)
                        //     );
                        // });
                      }}
                    >
                      ×
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Button
            onClick={() => {
              const newValue = nullThrows(
                update(values, { $push: [{ x: 0, y: 0, id: uuidv4() }] })
              );
              setValues(newValue);
            }}
          >
            ADD
          </Button>
        </>
      )}
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

  const [currentGameMode, setCurrentGameMode] = useLocalStorage({
    key: 'game-mode',
    defaultValue: GameMode.STANDARD,
  });

  const history = useHistory();

  const logger = useLogger();

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>
          <Text size="md">Changes are automatically saved</Text>

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

          <Text size="lg">Game modes</Text>
          <Select
            label={formatGameMode(
              currentGameMode ?? GameMode.STANDARD,
              'description'
            )}
            placeholder="Standard"
            data={Object.keys(GameMode).map((mode) =>
              formatGameMode(mode as GameMode, 'title')
            )}
            onChange={(mode) => {
              if (mode == null) return;
              setCurrentGameMode(mode as GameMode);
            }}
          />

          <Space h="xl" />

          <Button onClick={() => history.push('/play')} color="gray">
            PLAY
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}
