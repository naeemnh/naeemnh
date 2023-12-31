import { DesktopIconProps } from '@/types/props.interface'
import styles from './desktopicon.module.css'

export default function ({ icon, label, ...props }: DesktopIconProps) {
  return (
    <div className={styles.desktopIcon_wrapper} onClick={props.onClick} >
      <span>
        {icon}
      </span>
      {label && <p className={styles.desktopIcon_label}>{label}</p>}
    </div>
  )
}
