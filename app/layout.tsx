import './globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from '../src/contexts/FilterContext';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            <main>{children}</main>
          </FilterProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
