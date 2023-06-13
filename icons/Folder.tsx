import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill='currentColor' d="M0,96c0-35.3,28.7-64,64-64h132.1c19.1,0,37.4,7.6,50.9,21.1L289.9,96H448c35.3,0,64,28.7,64,64v256c0,35.3-28.7,64-64,64
	H64c-35.3,0-64-28.7-64-64V96z M77.5,68c-19.9,0-36.1,16.9-36.1,37.5v301.5c0,20.6,16.3,37.5,36.1,37.5h357
	c19.9,0,36.1-16.9,36.1-37.5V173.9c0-20.6-16.3-37.5-36.1-37.5H287.6c-10.9,0-17.8-9.4-25.5-17.4l-43-43c-4.6-4.8-18.2-8-24.8-8
	H77.5z" />
    </svg>
  )
}