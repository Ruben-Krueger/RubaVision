import { Container, Group, Burger } from '@mantine/core';
import React from 'react';
export default function RVHeader(): JSX.Element {
  return (
    <Container size="lg">
      RubaVision
      <Group gap={5} visibleFrom="xs">
        Profile
      </Group>
    </Container>
  );
}
