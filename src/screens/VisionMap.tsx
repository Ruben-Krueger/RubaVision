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
  FileInput,
} from '@mantine/core';

export default function Register(): JSX.Element {
  const [fileContent, setFileContent] = useState<string | ArrayBuffer>('');

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <FileInput
          label="Upload results"
          description="Upload compressed folder"
          placeholder="Folder"
          multiple
          onChange={(files) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              // Update state with file content
              setFileContent(event.target?.result ?? '');
            };

            for (const file in files) {
              reader.readAsText(file); // Read file as text, you can use other methods based on your file type
            }
          }}
        />
      </Paper>
    </Container>
  );
}
