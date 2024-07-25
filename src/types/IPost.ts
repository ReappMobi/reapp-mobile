export interface IPost {
  caption: string;
  id: number;
  imageUrl: string;
  institution: {
    avatar: string | null;
    name: string;
  };
  updatedAt: string;
}
