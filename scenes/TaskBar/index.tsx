import DesktopIcon from '@/components/DesktopIcon'
import styles from './taskbar.module.css'
import { BarsIcon } from '@/icons'

export default function TaskBar() {
  return (
    <div className={styles.taskbar_wrapper}>
      <div className={styles.taskbar_socials}>
        <BarsIcon size={30} />
      </div>
    </div>
  )
}