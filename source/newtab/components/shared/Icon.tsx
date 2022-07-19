import React from 'react';
import * as icons from 'react-feather';

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  color?: string;
  size?: string | number;
};
export function Icon({ name, color, size }: IconProps): JSX.Element {
  const IconComponent = icons[name as IconName];
  return <IconComponent color={color} size={size} />;
}
