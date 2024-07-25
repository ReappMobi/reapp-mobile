export interface IInstitution {
  id: number;
  name: string;
  category: string;
  avatar: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  facebook?: string;
  instagram?: string;
  followers_count: number;
  following_count: number;
  donations: number;
}
