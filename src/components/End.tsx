import {
  Container,
  Button,
  Flex,
  Center,
  Text,
  Paper,
  Space,
} from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Round from '../types/Round';
import { IconCheck, IconCircleX } from '@tabler/icons-react';
import Data from '../types/Data';
import nullThrows from 'capital-t-null-throws';
import { DateTime } from 'luxon';

function downloadResults(gameData: Data) {
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

export default function End(): JSX.Element {
  const history = useHistory();

  const savedInformation = window.localStorage.getItem('data');

  const data =
    savedInformation == null ? null : (JSON.parse(savedInformation) as Data);

  const rounds = data?.rounds ?? [];

  const score = rounds.filter((r) => r.guess === r.answer).length;

  return (
    <Container>
      <Center>
        <Flex gap="md" direction="column">
          <Text size="lg">Round over</Text>
          {rounds.length === 0 && (
            <Text size="lg">Uh-oh! We couldn't parse the previous game</Text>
          )}
          <Text size="md">Total score: {score} </Text>

          {rounds.map((round) => (
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
                </Flex>
              </Flex>
            </Paper>
          ))}

          <Button onClick={() => history.push('/play')}>PLAY AGAIN</Button>

          <Button onClick={() => history.push('/settings')} color="gray">
            SETTINGS
          </Button>

          <Button
            disabled={data == null}
            onClick={() => downloadResults(nullThrows(data))}
            color="gray"
          >
            DOWNLOAD
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}
