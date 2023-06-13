import { IconProps } from '@/types/props.interface'
import styles from './icons.module.css'

export default function ({ size = 40 }: IconProps) {
  return (
    <svg className={styles.icon} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill='currentColor' d="M442.3,109.2l-90.5-90.5C339.8,6.7,323.5,0,306.5,0H141c-35.3,0-64,28.7-64,64v384c0,35.3,28.7,64,64,64h256
	c35.3,0,64-28.7,64-64V154.5C461,137.5,454.3,121.2,442.3,109.2z M430,453.8c0,15.5-13.1,28.2-29,28.2H137c-15.9,0-29-12.7-29-28.2
	V58.2c0-15.5,13-28.2,29-28.2h167.8V117c0,19.2,16,34.8,35.8,34.8H430V453.8z M340.6,130c-7.6,0-13.8-6.2-13.8-13.8V30L430,130
	H340.6z M334.4,286.2H203.6c-5.2,0-9.3-4.2-9.3-9.3l0,0c0-5.2,4.2-9.3,9.3-9.3h130.8c5.2,0,9.3,4.2,9.3,9.3l0,0
	C343.8,282,339.6,286.2,334.4,286.2z M334.4,339.6H203.6c-5.2,0-9.3-4.2-9.3-9.3v0c0-5.2,4.2-9.3,9.3-9.3h130.8
	c5.2,0,9.3,4.2,9.3,9.3v0C343.8,335.4,339.6,339.6,334.4,339.6z M334.4,393H203.6c-5.2,0-9.3-4.2-9.3-9.3v0c0-5.2,4.2-9.3,9.3-9.3
	h130.8c5.2,0,9.3,4.2,9.3,9.3v0C343.8,388.8,339.6,393,334.4,393z" />
    </svg>
  )
}