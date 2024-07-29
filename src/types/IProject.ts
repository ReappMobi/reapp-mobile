export interface IProject {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  institutionId: number;
  categoryId: number;
  cover?: string;
  video?: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
}
