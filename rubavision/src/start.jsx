import { Button, Center } from '@mantine/core';
import { useHistory } from 'react-router-dom';

export default function Start() {
  const history = useHistory();
  return (
    <Center>
      <Button onClick={() => history.push('/play')}>START</Button>
    </Center>
  );
}
