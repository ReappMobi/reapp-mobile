export interface IDonationSegment {
  segment: string;
  value: number;
}

export const donationsBySegment: IDonationSegment[] = [
  { segment: 'Alzheimer', value: 31450023.45 },
  { segment: 'Bumba meu boi', value: 11000000.0 },
  { segment: 'Adulto sem teto', value: 3000000.0 },
  { segment: 'Amazônia', value: 2000000.0 },
  { segment: 'Resgate de animais', value: 500000.0 },
  { segment: 'Primeira Infância', value: 200000.0 },
  { segment: 'Segunda Infância', value: 100000.0 },
];
