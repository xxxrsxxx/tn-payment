'use client';

import type { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName: string;
}

function SectionErrorFallback({
  resetErrorBoundary,
  sectionName,
}: FallbackProps & { sectionName?: string }) {
  return (
    <div className="border-destructive/30 bg-destructive/5 rounded-lg border p-4">
      <p className="text-destructive text-sm">
        {sectionName} 로딩 중 오류가 발생했습니다.
      </p>
      <button
        onClick={resetErrorBoundary}
        className="text-destructive mt-2 text-xs underline hover:no-underline"
      >
        다시 시도
      </button>
    </div>
  );
}

export function SectionErrorBoundary({
  children,
  sectionName,
}: SectionErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={props => (
        <SectionErrorFallback {...props} sectionName={sectionName} />
      )}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
