// app/Dashboard/layout.tsx
'use client'
import { ReactNode } from 'react';
import MainWrapper from './layout/MainWrapper';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <MainWrapper>
      {children}
    </MainWrapper>
  );
}
