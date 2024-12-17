export interface IMedia {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  remote_url: string | null;
  text_url: string | null;
  meta: {
    focus: {
      x: number;
      y: number;
    };
    small: {
      size: string;
      width: number;
      aspect: number;
      height: number;
    };
    original: {
      size: string;
      width: number;
      aspect: number;
      height: number;
    };
  };
  description: string | null;
  blurhash: string;
}
