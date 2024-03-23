import { useHistory } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Center,
  Alert,
} from '@mantine/core';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props: PaperProps) {
  let history = useHistory();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (email: string) =>
        /^\S+@\S+$/.test(email) ? null : 'Invalid email',
      password: (password: string) =>
        password.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const [loginError, setLoginError] = useState<Error | null>(null);

  async function login() {
    try {
      const auth = getAuth();

      const user = await signInWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      );

      history.push('/start');
    } catch (error) {
      console.error(error);
      setLoginError(error as Error);
    }
  }

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Login
        </Text>

        <Stack>
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
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            size="xs"
            onClick={() => history.push('/register')}
          >
            Don't have an account? Register
          </Anchor>
          <Button type="submit" radius="xl" onClick={() => login()}>
            Login
          </Button>
        </Group>

        {loginError && (
          <Alert variant="light" color="red" title="Oops!">
            {JSON.stringify(loginError)}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
