import { Button, Center, Text, Container, Flex } from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';

const styles = {
  title: {},
};

export default function Start() {
  const history = useHistory();
  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text style={styles.title}>RubaVision</Text>
          <Flex gap="md" direction="column">
            <Button onClick={() => history.push('/play')}>START</Button>
            <Button onClick={() => history.push('/settings')}>SETTINGS</Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
