import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill='currentColor' d="M54,256c0-23.2,18.8-42,42-42s42,18.8,42,42s-18.8,42-42,42S54,279.2,54,256z M214,256c0-23.2,18.8-42,42-42s42,18.8,42,42
	s-18.8,42-42,42S214,279.2,214,256z M416,214c23.2,0,42,18.8,42,42s-18.8,42-42,42s-42-18.8-42-42S392.8,214,416,214z" />
    </svg>
  )
}