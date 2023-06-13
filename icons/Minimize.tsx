import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill='currentColor' d="M24 432c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z" />
    </svg>
  )
}