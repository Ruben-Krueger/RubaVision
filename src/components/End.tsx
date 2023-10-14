import { Container, Button, Flex, Center, Text } from '@mantine/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function End(): JSX.Element {
  const history = useHistory();

  return (
    <Container>
      <Center>
        <Flex gap="md" direction="column">
          <Text size="lg">Round over</Text>
          <Text size="md">Score: </Text>
          <Button onClick={() => history.push('/play')}>PLAY AGAIN</Button>
        </Flex>
      </Center>
    </Container>
  );
}
