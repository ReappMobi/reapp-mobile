export interface IPost {
  id: number;
  userId: number;
  content: string;
  media?: string;
  isMediaVideo?: boolean;
  createdAt: string;
  updatedAt: string;
}
