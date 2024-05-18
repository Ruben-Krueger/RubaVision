import { Container, AppShell } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';
import Markdown from 'markdown-to-jsx';
import terms from '../legal/terms-of-service.md';

export default function TermsOfService() {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		async function loadTermsOfService() {
			const termsOfService = await fetch(terms);
			const text = await termsOfService.text();
			setMarkdown(text);
		}

		loadTermsOfService();
	}, []);

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<RVHeader />

			<AppShell.Main>
				<Container>
					<Markdown>{markdown}</Markdown>
				</Container>
			</AppShell.Main>
			<RVFooter />
		</AppShell>
	);
}
