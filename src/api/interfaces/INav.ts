import { IconName, IconPrefix } from "@fortawesome/free-solid-svg-icons";

export interface INav {
  header?: string;
  items: {
    icon: [IconPrefix, IconName];
    title: string;
    to: string;
  }[];
}
