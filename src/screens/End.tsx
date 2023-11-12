import {
  Container,
  Button,
  Flex,
  Center,
  Text,
  Paper,
  Space,
  rem,
} from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Round from '../types/Round';
import { IconCheck, IconCircleX } from '@tabler/icons-react';
import Data from '../types/Data';
import nullThrows from 'capital-t-null-throws';
import { DateTime } from 'luxon';
import useLogger from '../util/useLogger';
import Position from '../types/Position';

function downloadResults(gameData: Data): void {
  const data =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(gameData, undefined, 2));

  const time = DateTime.fromMillis(gameData.timestamp).toFormat('ff');

  const fileName = `${time}-results.json`;

  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', data);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function RoundResult({ round }: { round: Round }): JSX.Element {
  const x = Math.round(round.targetCenter.x);
  const y = Math.round(round.targetCenter.y);

  return (
    <Paper key={round.startTimestamp} shadow="xs" p="xl">
      <Flex>
        {round.guess === round.answer ? (
          <IconCheck color="green" />
        ) : (
          <IconCircleX color="red" />
        )}
        <Space w="md" />
        <Flex direction="column">
          <Text>Guess: {round.guess ?? '(none)'}</Text>
          <Text>Answer: {round.answer}</Text>
          <Text>
            ({x}, {y})
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
}

export default function End(): JSX.Element {
  const history = useHistory();

  const savedInformation = window.localStorage.getItem('data');

  const data =
    savedInformation == null ? null : (JSON.parse(savedInformation) as Data);

  const rounds = data?.rounds ?? [];

  const score = rounds.filter((r) => r.guess === r.answer).length;

  const logger = useLogger();

  const initial = new Map<string, number>();

  const answers = rounds.reduce((previous, currentRound) => {
    const prevCount =
      previous.get(JSON.stringify(currentRound.targetCenter)) ?? 0;
    return previous.set(
      JSON.stringify(currentRound.targetCenter),
      prevCount + 1
    );
  }, initial);

  const test = rounds.map((r) => r.answer);

  const summary = answers.entries();

  console.log(answers);

  // const answers = [...new Set(rounds.map((r) => r.answer))];

  // const initial = {};

  // const summary = rounds.reduce((r) => (initial[r.answer] += 1), initial);

  // console.log(summary);

  return (
    <Container>
      <Center>
        <Flex gap="md" direction="column">
          <Text size="lg">Round over</Text>
          {rounds.length === 0 && (
            <Text size="lg">Uh-oh! We couldn't parse the previous game</Text>
          )}
          <Text size="md">Total score: {score} </Text>

          {rounds.map((r) => (
            <RoundResult round={r} />
          ))}

          <Button onClick={() => history.push('/play')}>PLAY AGAIN</Button>

          <Button onClick={() => history.push('/settings')} color="gray">
            SETTINGS
          </Button>

          <Button
            disabled={data == null}
            onClick={() => {
              logger.info({ eventName: 'download' });
              downloadResults(nullThrows(data));
            }}
            color="gray"
          >
            DOWNLOAD
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}
