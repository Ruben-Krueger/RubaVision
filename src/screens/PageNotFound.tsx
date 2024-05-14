import React from 'react';
import { Text, Container } from '@mantine/core';

export default function PageNotFound() {
	return (
		<Container>
			<Text>Uh-oh! We couldn&apos;t find this page</Text>
			<Text>This is probably a bug</Text>
		</Container>
	);
}
