import { ActionIcon, AppShell, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments } from '@tabler/icons-react';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          RubaVision
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Footer p="md">
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={() => history.push('/settings')}
          >
            <IconAdjustments
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </AppShell.Footer>
      </AppShell.Navbar>
      <AppShell.Main>
        <Text>About</Text>
        This software is intended for research purposes only. It is not intended
        for diagnostic or therapeutic use. This software has not been evaluated
        or approved by the U.S. Food and Drug Administration (FDA) or any other
        regulatory agency. Any use of this software for clinical or medical
        decision-making purposes is solely at the user's own risk. The accuracy,
        reliability, and suitability of this software for any particular purpose
        are not guaranteed. Users are responsible for ensuring compliance with
        all applicable laws and regulations governing the use of software in
        their jurisdiction.
      </AppShell.Main>
    </AppShell>
  );
}
