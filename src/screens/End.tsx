import {
  Container,
  Button,
  Flex,
  Center,
  Text,
  Table,
  ActionIcon,
  AppShell,
  Group,
} from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Round from '../types/Round';
import { IconAdjustments } from '@tabler/icons-react';
import Data from '../types/Data';
import nullThrows from 'capital-t-null-throws';
import { DateTime } from 'luxon';
import useLogger from '../util/useLogger';
import _, { sum } from 'lodash';
import RVHeader from '../components/RVHeader';
import RVFooter from '../components/RVFooter';

function downloadResults(gameData: Data): void {
  const data =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(gameData, undefined, 2));

  const time = DateTime.fromMillis(gameData.timestamp).toFormat('ff');

  const fileName = `${time}-results.json`;

  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', data);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function RoundResult({ rounds }: { rounds: Round[] }): JSX.Element {
  const results = _.groupBy(rounds, (r) => r.answer);

  const summary = Object.entries(results);

  return (
    <Table.Td>
      {summary.map(([answer, rounds]) => (
        <div key={answer}>
          {answer}: {rounds.filter((r) => r.guess === answer).length}/
          {rounds.length}
        </div>
      ))}
    </Table.Td>
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

  const results = _.groupBy(rounds, (r) => [
    r.targetCenter.x,
    r.targetCenter.y,
  ]);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <RVHeader />
      <AppShell.Main>
        <Container>
          <Center>
            <Flex gap="md" direction="column">
              <Text size="lg">Round over</Text>
              {rounds.length === 0 && (
                <Text size="lg">Uh-oh! We couldn't load the previous game</Text>
              )}
              <Text size="md">Total score: {score} </Text>

              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Coordinates</Table.Th>
                    <Table.Th>Result</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {Object.entries(results).map(([coordinates, rounds]) => (
                    <Table.Tr key={coordinates}>
                      <Table.Td>{coordinates}</Table.Td>
                      <RoundResult rounds={rounds} />
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

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
      </AppShell.Main>
      <RVFooter />
    </AppShell>
  );
}
