export interface ICategory {
  category: string;
  id: number;
}

export const institutionCategories: ICategory[] = [
  { category: 'Infância', id: 1 },
  { category: 'Adolescência', id: 2 },
  { category: 'Adultos', id: 3 },
];
