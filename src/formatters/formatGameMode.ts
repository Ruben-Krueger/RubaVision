import GameMode from '../types/GameMode';

const metadata: { [key in GameMode]: { description: string; title: string } } =
  {
    EMOTION: {
      description: 'Guess the emotions on a baby face',
      title: 'Emotion',
    },
    STATIC_COLORS: {
      description: 'Guess the color of static shapes',
      title: 'Static colors',
    },
    STATIC_SHAPES: {
      description: 'Guess the type of shape',
      title: 'Static shapes',
    },
    STANDARD: {
      description: 'Guess the direction of moving circles',
      title: 'Standard',
    },
  };

export default function formatGameMode(
  mode: GameMode,
  format: 'description' | 'title'
): string {
  return metadata[mode][format];
}
