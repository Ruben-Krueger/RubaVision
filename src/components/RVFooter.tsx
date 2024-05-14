import { AppShell, Text, Group } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Anchor } from '@mantine/core';

export default function RVFooter() {
  const history = useHistory();
  return (
    <AppShell.Footer p="md">
      <Group h="100%" px="md">
        <IconSettings onClick={() => history.push('/settings')} />
        <Anchor href="/about" c="black">
          About
        </Anchor>
        <Anchor href="/terms-of-service" c="black">
          Terms of Service
        </Anchor>
      </Group>
    </AppShell.Footer>
  );
}
