import type { Metadata } from 'next';

import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: '충전하기',
  description: '충전하기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>toon</title>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-jp-dynamic-subset.css"
        />
      </head>
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
