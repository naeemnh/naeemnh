"use client";

import styles from './page.module.css'
import Window from '@/components/Window'
import { useWindow } from '@/context/WindowContext'
import DesktopMenu from '@/scenes/DesktopMenu';

export default function Home() {
  const { windows } = useWindow()
  return (
    <main className={styles.main}>
      {
        windows.length > 0 && windows.some(window => window.open === true) ?
          (
            windows.map((window, i) => <Window key={i} {...window} />)
          ) : <>
            <div className={styles.about_me}>

              <h1>Hello, My name is Naeem Hussain</h1>
              {/* <p>Frontend | Wordpress Developer</p> */}
              <p>I am a web and app developer, crafting digital solutions with a passion for innovation and a commitment to excellence.</p>
            </div>
          </>
      }
      <DesktopMenu />
    </main>
  )
}
