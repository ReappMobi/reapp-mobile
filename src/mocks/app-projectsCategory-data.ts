export interface ICategory {
  id: number;
  category: string;
}

export const projectCategories: ICategory[] = [
  { id: 1, category: 'Pessoas sem teto' },
  { id: 2, category: 'Reflorestamento' },
  { id: 3, category: 'Resgate de animais' },
  { id: 4, category: 'Diversos' },
];
