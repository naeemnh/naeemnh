"use client";

import Draggable, { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable';
import styles from './window.module.css';
import { CloseIcon, MinimizeIcon } from '@/icons';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useWindow } from '@/context/WindowContext';
import { WindowProps } from '@/types/props.interface';


const Window = ({ children, title, open, position, defaultPosition, ...props }: WindowProps) => {
  const { windows, focusWindow, updateWindowPosition, setWindows } = useWindow();
  const [currentBounds, setCurrentBounds] = useState<ControlPosition>(position || defaultPosition)
  const mediaQuery = '(max-width: 450px)';
  const mediaQueryList = typeof window != 'undefined' && window.matchMedia(mediaQuery);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  const windowRef = useRef<any>(null)

  function closeWindow(e: MouseEvent) {
    handleFocus();
    const windowIndex = windows.findIndex(window => window.title === title)
    setWindows(windows => windows.filter((window, index) => index !== windowIndex));
    e.stopPropagation();
  }

  function minimizeWindow(e: MouseEvent) {
    e.stopPropagation()
  }

  useEffect(() => {
    setCurrentBounds(position || defaultPosition)
  }, [windows])

  useEffect(() => {
    mediaQueryList && mediaQueryList.addEventListener('change', (e) => {
      e.matches ? setIsSmallScreen(true) : setIsSmallScreen(false)
    })
  })

  const handleFocus = () => {
    if (windows.length > 1) focusWindow(title);
    if (isSmallScreen) return false;
  }

  const handlePosition = (e: DraggableEvent, ui: DraggableData) => {
    setCurrentBounds({ x: currentBounds.x + ui.deltaX, y: currentBounds.y + ui.deltaY })
  }

  const handleWindowPosition = (e: DraggableEvent, ui: DraggableData) => {
    updateWindowPosition(title, currentBounds);
  }

  return (
    <>
      <Draggable defaultPosition={defaultPosition} position={isSmallScreen ? defaultPosition : position} onStart={handleFocus} handle='div.draggable' onDrag={handlePosition} onStop={handleWindowPosition}>
        <div className={styles.window} ref={windowRef} onClick={handleFocus} style={{ zIndex: props.zIndex, display: (isSmallScreen && (props.zIndex < windows.length + 9)) ? 'none' : 'block' }}>
          <div className={styles.window_topbar}>
            <p>
              ../{title}
            </p>
            <div className={`${styles.draggable} draggable`}></div>
            <div className={styles.window_options}>
              <span onClick={minimizeWindow}>
                <MinimizeIcon size={20} />
              </span>
              <span onClick={closeWindow}>
                <CloseIcon size={20} />
              </span>
            </div>
          </div>
          {children}
        </div>
      </Draggable>
    </>
  )
}

export default Window;