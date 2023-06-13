import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill='currentColor' d="M26.8,157L234.9,300c12.7,8.7,29.4,8.7,42.1,0L485.2,157V111c0-10.3-8.4-18.7-18.7-18.7H45.6c-10.3,0-18.7,8.4-18.7,18.7
	V157z M485.2,196.7l-187,128.5c-25.4,17.5-59,17.5-84.4,0l-187-128.5v204.3c0,10.4,8.4,18.8,18.8,18.8h420.8
	c10.4,0,18.8-8.4,18.8-18.8V196.7z M0,415.4v-240v-80v0c0-17.7,14.3-32,32-32h0h448h0c17.7,0,32,14.3,32,32v0v80v240v0
	c0,17.7-14.3,32-32,32h0H32h0C14.3,447.4,0,433.1,0,415.4L0,415.4z" />
    </svg>
  )
}