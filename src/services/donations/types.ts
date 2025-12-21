import { Donation } from 'src/types/IDonation';

export type GetDonationsParams = {
  pageParam?: number;
  period: string;
  donorId?: number;
};

export type GetDonationsResponse = Donation[];
