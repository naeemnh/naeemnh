import { Fragment, useState } from 'react';
import { IconProps } from '@/types/props.interface';
import { useWindow } from '@/context/WindowContext';
import DesktopIcon from '@/components/DesktopIcon'
import classnames from '@/helpers/classnames';
import Projects from '../Files/Projects';
import Skills from '../Files/Skills';
import Contact from '../Files/Contact';
import { EnvelopeIcon, FileArchiveIcon, FolderIcon, MoreIcon } from '@/icons';
import styles from './desktopmenu.module.css';

interface Menu {
  label?: string;
  icon: (props: IconProps) => JSX.Element;
  createWindow: boolean;
  content: {
    component: () => React.JSX.Element,
  };
}

const menu: Menu[] = [
  {
    label: "Projects",
    icon: FolderIcon,
    createWindow: true,
    content: {
      component: Projects,
    }
  },
  {
    label: "Skills.zip",
    icon: FileArchiveIcon,
    createWindow: true,
    content: {
      component: Skills
    }
  },
  {
    label: "Contact.exe",
    icon: EnvelopeIcon,
    createWindow: true,
    content: {
      component: Contact
    }
  },
  {
    icon: MoreIcon,
    createWindow: false,
    content: {
      component: () => <></>
    }
  },
]
export default function DesktopMenu() {
  const { createWindow } = useWindow();
  const [showOtherThings, setShowOtherThings] = useState<boolean>(false)

  return (
    <nav className={styles.desktopMenu_wrapper}>
      {menu.map((item, i) => {
        const onClick = item.createWindow ? (() => createWindow({ children: <item.content.component />, title: item.label })) : () => { setShowOtherThings(!showOtherThings) };
        return (
          <Fragment key={i}>
            <DesktopIcon icon={<item.icon size={30} />} label={item.label} onClick={onClick} />
            {!item.createWindow && <div className={classnames([styles.desktopMenu_wrapper, styles.otherThings, showOtherThings ? styles.show : ''])}>Showing other things</div>}
          </Fragment>
        )
      })}
    </nav>
  )
}
