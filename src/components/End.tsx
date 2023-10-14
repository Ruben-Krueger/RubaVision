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

export default function End(): JSX.Element {
  const history = useHistory();

  const savedInformation = window.localStorage.getItem('rounds');
  const rounds =
    savedInformation == null ? [] : (JSON.parse(savedInformation) as Round[]);

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

          {rounds.map((round, i) => (
            <Paper key={round.startMS} shadow="xs" p="xl">
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
        </Flex>
      </Center>
    </Container>
  );
}
