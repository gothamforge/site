import { IconType } from 'react-icons/lib';

import {
  IoHomeOutline,
  IoFileTrayFull,
} from 'react-icons/io5';

export type RouteOption = {
  path: string;
  icon: IconType
  label: string;
};

const list:RouteOption[] = [
  {
    path: "/",
    icon: IoHomeOutline,
    label: 'Home'
  },
  {
    path: "/collections",
    icon: IoFileTrayFull,
    label: 'Collections'
  },
];

export default list;