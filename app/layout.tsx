import './globals.css';
import { ReactNode } from 'react';
import Providers from './providers';
import { FilterProvider } from '../src/contexts/FilterContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FilterProvider>
            <main>{children}</main>
          </FilterProvider>
        </Providers>
      </body>
    </html>
  );
}
