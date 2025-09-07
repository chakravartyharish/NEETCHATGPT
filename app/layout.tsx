import '../styles/globals.css'

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'NEET Prep AI',
  description: 'Phase 1 starter',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>
        <main className="min-h-screen">{children}</main>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if ('serviceWorker' in navigator && '${process.env.NEXT_PUBLIC_ENABLE_PWA}'==='true') {
            window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
          }`,
          }}
        />
      </body>
    </html>
  )
}
