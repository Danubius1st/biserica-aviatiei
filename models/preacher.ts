export type preacher = {
  id: number;
  info: preacherImage;
};

export type preacherImage = {
  name: string;
  imageAddress: string;
  imageWidth: number;
  imageHeight: number;
  title?: string;
  info?: string;
};
