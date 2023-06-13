import { Dispatch, SetStateAction } from "react";
import { ControlPosition, DraggableProps } from "react-draggable";

export interface DesktopIconProps {
  icon: JSX.Element;
  label?: string;
  onClick: () => void;
}

export interface IconProps {
  size?: number;
}

export interface WindowProps extends DraggableProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  zIndex: number;
  open: boolean;
}

export interface WindowContextProps {
  windows: WindowProps[];
  setWindows: Dispatch<SetStateAction<WindowProps[]>>;
  createWindow: (options: any) => void;
  focusWindow: (title: WindowProps['title']) => void;
  updateWindowPosition: (title: WindowProps['title'], updatedPosition: ControlPosition) => void;
}