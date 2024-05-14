import { Container, Center, Text, Flex, Button, Alert } from '@mantine/core';
import React from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function ErrorScreen({ error }: { error: Error }): JSX.Element {
	return (
		<>
			<Container>
				<Center>
					<Flex direction="column">
						<Alert
							variant="light"
							color="red"
							title="Uh-oh! Something went wrong"
							icon={<IconInfoCircle />}
						>
							<Button
								onClick={() => {
									window.localStorage.clear();
									location.reload();
								}}
							>
								Reset settings
							</Button>

							<Text>{error.message}</Text>
							<Text>{error.stack}</Text>
						</Alert>
					</Flex>
				</Center>
			</Container>
		</>
	);
}
