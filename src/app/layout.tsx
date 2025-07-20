import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}