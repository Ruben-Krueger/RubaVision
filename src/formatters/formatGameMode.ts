import GameMode from '../types/GameMode';

const metadata: {
	[key in GameMode]: {
		description: string;
		title: string;
		instructions: string;
	};
} = {
	EMOTION: {
		description: 'Guess the emotions on a baby face',
		title: 'Emotion',
		instructions: "Use 'h' and 's' keys to guess happy or sad"
	},

	COLORS: {
		description: 'Guess the color (red, green, yellow) of circles',
		title: 'Colors',
		instructions:
			"Use '4' to guess red, '5' to guess green, '6' to guess yellow "
	},
	SHAPES: {
		description: 'Guess the type (triangle, square, circle) of shape ',
		title: 'Shapes',
		instructions:
			"Use '1' to guess circle, '2' to guess square, '3' to guess triangle "
	},
	MOTION: {
		description: 'Guess the direction of moving circles',
		title: 'Motion',
		instructions: 'Use left/right arrow keys to guess the direction'
	}
};

export default function formatGameMode(
	mode: GameMode,
	format: 'description' | 'title' | 'instructions'
): string {
	return metadata[mode][format];
}
