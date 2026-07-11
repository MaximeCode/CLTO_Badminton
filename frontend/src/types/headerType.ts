export type NavSubItem = {
  label: string;
  path: string;
};

export type NavItem =
  | {
      title: string;
      path: string;
      items?: never;
    }
  | {
      title: string;
      path?: never;
      items: NavSubItem[];
    };
