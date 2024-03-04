import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Afeez Lawal - Software engineer',
    description:
        'Results-driven Software Engineer with a strong background in frontend development and a passion for creating exceptional user experiences. Proficient in TypeScript, React, NextJS, Preact, and CSS, with a track record of designing and implementing innovative web applications. Adept at collaborating with cross-functional teams to deliver high-quality solutions that drive productivity and user satisfaction.',
    keywords:
        'Software engineer, frontend developer, backend developer, fullstack developer, Software, Frontend, Backend, Fullstack, Full-stack, Engineer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-bg`}>{children}</body>
        </html>
    );
}
