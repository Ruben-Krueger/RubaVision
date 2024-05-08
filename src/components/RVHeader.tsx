import { Container, Group, Burger, Flex } from '@mantine/core';
import React from 'react';
export default function RVHeader(): JSX.Element {
  return (
    <header>
      <Container size="lg">
        <Flex>RubaVision</Flex>
        {/* RubaVision
        <Group gap={5} visibleFrom="xs">
          Profile
        </Group> */}
      </Container>
    </header>
  );
}
