import { Anchor, AppShell, Container, Text } from '@mantine/core';
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
					<Text>
						This is free, open-source software to promote research into cortical
						visual impairement.
					</Text>

					<Anchor
						href="https://github.com/Ruben-Krueger/RubaVision"
						underline="always"
					>
						View and modify the source code here!
					</Anchor>
				</Container>
			</AppShell.Main>

			<RVFooter />
		</AppShell>
	);
}
