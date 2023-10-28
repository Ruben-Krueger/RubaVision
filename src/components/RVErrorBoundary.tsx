import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorScreen from '../screens/ErrorScreen';

export default function RVErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary fallbackRender={ErrorScreen}>{children}</ErrorBoundary>;
}
