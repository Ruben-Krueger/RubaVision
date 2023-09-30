import { Button, Center, Text, Container, Flex, Modal } from '@mantine/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';

const styles = {
  title: {},
};

export default function Start() {
  const history = useHistory();

  // TODO: fix flashing because local storage waiting
  const [accepted, setHasAccepted] = useLocalStorage({
    key: 'accepted',
    defaultValue: 'false',
  });

  const hasAccepted = JSON.parse(accepted ?? '') === true;

  return !hasAccepted ? (
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
          <Text style={styles.title}>RubaVision</Text>
          <Flex gap="md" direction="column">
            <Button onClick={() => history.push('/play')}>START</Button>
            <Button onClick={() => history.push('/settings')}>SETTINGS</Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
