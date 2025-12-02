export type navigationType = {
  id: number,
  description: string,
  href: string;
  subMenu?: navigationType[];
};
