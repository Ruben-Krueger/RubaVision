import { AppShell, Container, Text } from '@mantine/core';
import React from 'react';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';

export default function About() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <RVHeader />

      <AppShell.Main>
        <Container>
          <Text>About</Text>
          This software is intended for research purposes only. It is not
          intended for diagnostic or therapeutic use. This software has not been
          evaluated or approved by the U.S. Food and Drug Administration (FDA)
          or any other regulatory agency. Any use of this software for clinical
          or medical decision-making purposes is solely at the user's own risk.
          The accuracy, reliability, and suitability of this software for any
          particular purpose are not guaranteed. Users are responsible for
          ensuring compliance with all applicable laws and regulations governing
          the use of software in their jurisdiction.
        </Container>
      </AppShell.Main>

      <RVFooter />
    </AppShell>
  );
}
