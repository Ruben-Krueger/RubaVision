import { Center, Text, Container, Flex, AppShell } from '@mantine/core';
import React from 'react';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';

export default function Home() {
	return (
		<AppShell header={{ height: 60 }} padding="md">
			<RVHeader />
			<AppShell.Main>
				<Container>
					<Center>
						<Flex direction="column">
							<Center>
								<Text size="xl">Home</Text>
							</Center>
						</Flex>
					</Center>
				</Container>
			</AppShell.Main>
			<RVFooter />
		</AppShell>
	);
}
