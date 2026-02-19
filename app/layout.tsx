import type { Metadata } from "next";
import Layout from "../components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentHunt | Stop Chatting. Start Executing.",
  description: "Find the best AI agents for your tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    background: '#FFFFFF',
                    card: '#FFFFFF',
                    border: '#E5E7EB',
                    primary: '#111827',
                    muted: '#6B7280',
                    brand: '#000000',
                    brandHover: '#333333',
                    success: '#10B981',
                  }
                }
              }
            }
          `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Geist', sans-serif;
            background-color: #FFFFFF;
            color: #111827;
          }
          .glow-hover:hover {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            border-color: rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </head>
      <body className="bg-background text-primary antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
