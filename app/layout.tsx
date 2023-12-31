// 'use client';

import CanvasAnimation from '@/scenes/CanvasAnimation';
import './globals.css'
import { Inter, Montserrat, Poppins } from 'next/font/google'
import DesktopMenu from '@/scenes/DesktopMenu';
import TaskBar from '@/scenes/TaskBar';
import { WindowProvider } from '@/context/WindowContext';

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'Naeem Hussain',
  description: 'My Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <CanvasAnimation />
        <WindowProvider>
          {children}
        </WindowProvider>
        {/* <TaskBar /> */}
      </body>
    </html>
  )
}
