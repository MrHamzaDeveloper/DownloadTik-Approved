// app/layout.js
import localFont from "next/font/local";
import "./globals.css";

// Load fonts with localFont
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap", // Ensures smooth loading of fonts
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap", // Ensures smooth loading of fonts
});

// RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Static metadata */}
        <meta name="description" content="Download TikTok videos with ease!" />
        <title>DownloadTik</title>
        {/* Preload the font files for better performance */}
        <link
          rel="preload"
          href="./fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
