import { IconName, IconPrefix } from "@fortawesome/free-solid-svg-icons";

export interface IUser {
  name: string;
  menu: string;
  nav: {
    header?: string;
    items: {
      icon: [IconPrefix, IconName];
      title: string;
      to: string;
    }[];
  }[];
}
