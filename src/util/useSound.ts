import sound from 'use-sound';
import wrong from './wrong.mp3';

export default function useSound() {
  const [play] = sound(wrong);
  return play;
}
