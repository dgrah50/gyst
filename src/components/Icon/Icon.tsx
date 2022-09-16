import React from 'react';
import * as icons from 'react-feather';

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  color?: string;
  size?: string | number;
  onClick?: () => void;
};
export default function Icon({ name, color, size, onClick }: IconProps): JSX.Element {
  const IconComponent = icons[name as IconName];
  return <IconComponent color={color} size={size} onClick={onClick} />;
}
