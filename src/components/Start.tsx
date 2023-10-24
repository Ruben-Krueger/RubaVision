import {
  Button,
  Center,
  Text,
  Container,
  Flex,
  Modal,
  Paper,
  Space,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';

const MODAL_ENABLED = false;

export default function Start() {
  const history = useHistory();

  // TODO: fix flashing because local storage waiting
  const [accepted, setHasAccepted] = useLocalStorage({
    key: 'accepted',
    defaultValue: 'false',
  });

  const hasAccepted = JSON.parse(accepted ?? '') === true;

  return MODAL_ENABLED && !hasAccepted ? (
    <Modal
      opened={hasAccepted}
      onClose={() => {}}
      title="But first! A small warning."
      centered
      withCloseButton={false}
    >
      <Text>
        This software is for educational purposes. This software have not been
        evaluated by the Food and Drug Administration, nor is it intended to
        diagnose, treat, cure, or prevent any disease.
      </Text>
      <Button onClick={() => setHasAccepted('true')}>I accept</Button>
    </Modal>
  ) : (
    <Container>
      <Center>
        <Flex direction="column">
          <Text size="xl">RubaVision</Text>

          <Paper shadow="lg" p="xl">
            <Text>Game play:</Text>
            <Text>
              - Black circles will be moving left or right (with random vertical
              motion)
            </Text>
            <Text>
              - Use the left and right arrows to guess whether it is left or
              right
            </Text>
            <Text>- Click "START" to begin</Text>
          </Paper>

          <Space h="lg" />

          <Flex gap="md" direction="column">
            <Button onClick={() => history.push('/play')}>START</Button>
            <Button color="gray" onClick={() => history.push('/settings')}>
              SETTINGS
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
