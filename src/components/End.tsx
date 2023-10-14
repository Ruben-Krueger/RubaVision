import { Container, Button, Flex, Center, Text, Paper } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Round from '../types/Round';

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
          <Text size="md">Total score: {score} </Text>

          {rounds.map((round, i) => (
            <Paper key={round.startMS} shadow="xs" p="xl">
              <Text>Guess: {round.guess ?? '(none)'}</Text>
              <Text>Answer: {round.answer}</Text>
            </Paper>
          ))}

          <Button onClick={() => history.push('/play')}>PLAY AGAIN</Button>
        </Flex>
      </Center>
    </Container>
  );
}
