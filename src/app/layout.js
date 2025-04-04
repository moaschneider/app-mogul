import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Mogul - API Key Management",
  description: "Secure API Key Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
