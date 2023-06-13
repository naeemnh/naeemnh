"use client";

import { createContext, useContext, useState, SetStateAction } from "react";
import { WindowContextProps, WindowProps } from "@/types/props.interface";
import { ControlPosition } from "react-draggable";

const WindowContext = createContext<WindowContextProps>({
  windows: [],
  setWindows: function (value: SetStateAction<WindowProps[]>): void {
    throw new Error("Function not implemented.");
  },
  createWindow: function (options: WindowProps): void {
    throw new Error("Function not implemented.");
  },
  focusWindow: function (title: WindowProps['title']): void {
    throw new Error("Function not implemented.");
  },
  updateWindowPosition: function (id, updatedPosition): void {
    throw new Error("Function not implemented.");
  },
});
export const useWindow = () => useContext(WindowContext);

function useWindowProvider() {
  const [windows, setWindows] = useState<WindowProps[]>([])

  function createWindow(options: WindowProps): void {
    if (windowExists(options.title)) focusWindow(options.title)
    else {
      const window: WindowProps = { ...options, open: true, defaultPosition: { x: 0, y: 0 }, zIndex: windows.length + 10 };
      setWindows((windows) => [...windows, window])
    }
  }

  /**
   * Window Exists
   * @param title Title of the Window Screen
   * @returns {boolean} Check if window exists
   */
  function windowExists(title: WindowProps['title']): boolean {
    return windows.some(window => window.title == title);
  }

  /**
   * Focus Window
   * @param {WindowProps['title']} title Title of the Window Screen
   * @returns {void} Focuses the window clicked
   */
  function focusWindow(title: WindowProps['title']): void {
    const windowIndex = windows.findIndex(window => window.title == title);
    if (windows.length > 1 || windows[windowIndex].zIndex !== windows.length + 9) {
      const windowsFocusSorted = windows.map((window, i) => {
        if (i == windowIndex) window.zIndex = windows.length + 9
        else if (window.zIndex >= windows[windowIndex].zIndex) window.zIndex = window.zIndex - 1;
        console.log(window.zIndex)
        return window
      })

      setWindows(windowsFocusSorted);
    }
    // // Find the index of the window with the specified id
    // const windowIndex = windows.findIndex(window => window.title === title);
    // console.log(windowIndex)
    // // Remove the window from the current position
    // const updatedWindows = [...windows];
    // const windowToMove = updatedWindows.splice(windowIndex!, 1)[0];

    // // Add the window to the last position
    // updatedWindows.push(windowToMove);

    // // Update the state with the modified array
    // setWindows(updatedWindows);
    // console.log(windows)
  }

  const updateWindowPosition = (title: WindowProps['title'], updatedPosition: ControlPosition) => {
    console.log('reached here')
    // Create a copy of the state array
    const updatedWindows = [...windows];

    // Find the specific object by its id
    const windowToUpdate = updatedWindows.find(window => window.title === title);

    if (windowToUpdate) {
      // Update the details of the specific object
      // windowToUpdate.defaultPosition = updatedBounds;
      windowToUpdate.position = updatedPosition
      console.log(windowToUpdate)

      // Update the state with the modified array
      setWindows(updatedWindows);
    } else {
      console.log('could not find window to update')
    }
  };

  return { windows, setWindows, createWindow, focusWindow, updateWindowPosition }
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const value = useWindowProvider();

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  )
}