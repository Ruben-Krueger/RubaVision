import { Text, Container, Center, Flex, Slider, Space } from '@mantine/core';
import React, { useState } from 'react';

export default function Settings(): JSX.Element {
  const [numberOfRounds, setNumberOfRounds] = useState(5);

  return (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">Settings</Text>

          <Space h="xl" />

          <Text size="md">Rounds</Text>
          <Text size="md" fs="italic">
            The number of guesses per game
          </Text>
          <Slider
            min={1}
            max={10}
            defaultValue={5}
            label={numberOfRounds}
            value={numberOfRounds}
            onChange={(value) => setNumberOfRounds(value)}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />

          <Space h="xl" />

          <Text size="md">Target position</Text>
          <Text size="md" fs="italic">
            Screen location for targets
          </Text>
        </Flex>
      </Center>
    </Container>
  );
}
