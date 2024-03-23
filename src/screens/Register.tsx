import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Alert,
  Container,
} from '@mantine/core';
import { useHistory } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register(): JSX.Element {
  const history = useHistory();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const auth = getAuth();

  const [registerError, setRegisterError] = useState<Error | null>(null);

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      );

      history.push('/start');
    } catch (error) {
      console.error(error);
      setRegisterError(error as Error);
    }
  }

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Register
        </Text>

        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            radius="md"
          />

          <TextInput
            required
            label="Email"
            placeholder="hello@rubavision.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue('terms', event.currentTarget.checked)
            }
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            size="xs"
            onClick={() => history.push('/login')}
          >
            Already have an account? Login
          </Anchor>
          <Button type="submit" radius="xl" onClick={() => register()}>
            Register
          </Button>
        </Group>

        {registerError && (
          <Alert variant="light" color="red" title="Oops!">
            {JSON.stringify(registerError)}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
