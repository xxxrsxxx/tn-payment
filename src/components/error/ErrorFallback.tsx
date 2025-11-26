'use client';
import React, { useEffect } from 'react';

interface ErrorFallbackProps {
  error?: unknown;
}

export default function ErrorFallback(props: ErrorFallbackProps) {
  const { error } = props;
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  return <div>ERROR VIEW</div>;
}
