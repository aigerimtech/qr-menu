import "./globals.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};