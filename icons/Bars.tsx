import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill='currentColor' d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" />
    </svg>
  )
}