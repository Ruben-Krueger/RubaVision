import { Container, Center, Text, Flex } from '@mantine/core';
import React from 'react';

export default function ErrorScreen({ error }: { error: Error }): JSX.Element {
  return (
    <>
      <Container>
        <Center>
          <Flex direction="column">
            <Text size="lg">Uh-oh! Something went wrong</Text>
            <Text>{error.name}</Text>
            <Text>{error.message}</Text>
            <Text>{error.stack}</Text>
          </Flex>
        </Center>
      </Container>
    </>
  );
}
