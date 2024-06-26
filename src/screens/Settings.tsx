import {
	Text,
	Container,
	Center,
	Flex,
	Slider,
	Space,
	Group,
	rem,
	Button,
	NumberInput,
	Select,
	AppShell,
	Table
} from '@mantine/core';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';

import update from 'immutability-helper';

import nullThrows from 'capital-t-null-throws';
import Position from '../types/Position';
import { v4 as uuidv4 } from 'uuid';
import GameMode from '../types/GameMode';
import formatGameMode from '../formatters/formatGameMode';
import RVFooter from '../components/RVFooter';
import RVHeader from '../components/RVHeader';

function CoordinateBox() {
	const width = window.innerWidth / 5;
	const height = window.innerHeight / 5;

	const [values, setValues] = useLocalStorage({
		key: 'target-centers',
		defaultValue: [] as Position[]
	});

	const formatColor = (color: string) => `--mantine-color-${color}-8`;

	const colors = [
		formatColor('blue'),
		formatColor('red'),
		formatColor('green'),
		formatColor('yellow'),
		formatColor('orange'),
		formatColor('pink')
	];

	return (
		<Container>
			<Space h="xl" />

			<Group justify="center">
				<div
					style={{
						width,
						height,
						backgroundColor: 'var(--mantine-color-blue-light)',
						position: 'relative'
					}}
				>
					<p style={{ position: 'absolute', left: -20, top: -40 }}>0,0</p>
					<p style={{ position: 'absolute', left: width, top: height }}>
						{window.innerWidth},{window.innerHeight}
					</p>
					<>
						{values?.map((v, i) => (
							<div
								key={v.id ?? `${v.x},${v.y}`}
								style={{
									position: 'absolute',
									left: `calc(${(v?.x / window.innerWidth ?? 0) * 100}% - ${rem(
										8
									)})`,
									top: `calc(${(v?.y / window.innerHeight ?? 0) * 100}% - ${rem(
										8
									)})`,
									width: rem(16),
									height: rem(16),
									backgroundColor: `var(${colors[i]})`
								}}
							/>
						))}
					</>
				</div>
			</Group>

			<Space h="xl" />

			<>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Target</Table.Th>

							<Table.Th>Coordinates (x,y)</Table.Th>
							<Table.Th>Action</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{values?.map((value, i) => (
							<Table.Tr key={value.id}>
								<Table.Td>
									<div
										style={{
											width: rem(16),
											height: rem(16),
											backgroundColor: `var(${colors[i]})`
										}}
									/>
								</Table.Td>
								<Table.Td>
									<Flex>
										<NumberInput
											value={value.x}
											onChange={(newX) => {
												setValues((previous) => {
													const array = [...previous];
													array[i].x =
														typeof newX === 'string' ? parseInt(newX) : newX;

													return array;
												});
											}}
											hideControls
											allowNegative={false}
											max={window.innerWidth}
										/>
										<NumberInput
											value={value.y}
											onChange={(newY) => {
												setValues((previous) => {
													const array = [...previous];
													array[i].y =
														typeof newY === 'string' ? parseInt(newY) : newY;

													return array;
												});
											}}
											min={0}
											max={window.innerHeight}
											hideControls
										/>
									</Flex>
								</Table.Td>
								<Table.Td>
									<Button
										color="red"
										onClick={() => {
											setValues((previous) => {
												const array = [...previous];
												array.splice(i, 1);
												return array;
											});
										}}
									>
										×
									</Button>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>

				<Space h="md" />

				<Button
					onClick={() => {
						const newValue = nullThrows(
							update(values, { $push: [{ x: 0, y: 0, id: uuidv4() }] })
						);
						setValues(newValue);
					}}
				>
					ADD
				</Button>
			</>
		</Container>
	);
}

export default function Settings(): JSX.Element {
	const [numberOfRounds, setNumberOfRounds] = useLocalStorage({
		key: 'number-rounds',
		defaultValue: 5
	});

	const [roundLength, setRoundLength] = useLocalStorage({
		key: 'round-length',
		defaultValue: 1
	});

	const [currentGameMode, setCurrentGameMode] = useLocalStorage({
		key: 'game-mode',
		defaultValue: GameMode.MOTION
	});

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<RVHeader />

			<AppShell.Main>
				<Center>
					<Flex direction="column">
						<Text size="xl">Settings</Text>
						<Text size="md">Changes are automatically saved</Text>

						<Space h="xl" />

						<Text size="lg">Rounds</Text>
						<Text size="md" fs="italic">
							The number of guesses per game (between 1 to 1000)
						</Text>
						<NumberInput
							placeholder="10"
							min={1}
							max={1000}
							value={numberOfRounds}
							onChange={(v) => setNumberOfRounds(v as number)}
						/>

						<Space h="xl" />

						<Text size="lg">Round length</Text>
						<Text size="md" fs="italic">
							The amount of time per each round in seconds.
						</Text>
						<Slider
							min={1}
							max={5}
							defaultValue={5}
							label={roundLength}
							value={roundLength}
							onChange={(value) => setRoundLength(value)}
							marks={[
								{ value: 1, label: '1' },
								{ value: 3, label: '3' },
								{ value: 5, label: '5' }
							]}
						/>

						<Space h="xl" />

						<Text size="lg">Target position</Text>

						<CoordinateBox />

						<Space h="xl" />

						<Text size="lg">Game modes</Text>
						<Select
							label={formatGameMode(
								currentGameMode ?? GameMode.MOTION,
								'description'
							)}
							placeholder={formatGameMode(
								currentGameMode ?? GameMode.MOTION,
								'title'
							)}
							data={Object.keys(GameMode).map((mode) => ({
								label: formatGameMode(mode as GameMode, 'title'),
								value: mode
							}))}
							onChange={(mode) => {
								if (mode == null) return;
								setCurrentGameMode(mode as GameMode);
							}}
						/>

						<Text>
							{formatGameMode(
								currentGameMode ?? GameMode.MOTION,
								'instructions'
							)}
						</Text>

						<Space h="xl" />
						<Space h="xl" />
						<Space h="xl" />
					</Flex>
				</Center>
			</AppShell.Main>

			<RVFooter />
		</AppShell>
	);
}
