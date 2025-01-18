import { IDonor } from 'src/mocks/user-data';

import { IInstitution } from './IInstitution';
import { IProject } from './IProject';

enum DonationStatus {
  PENDING,
  APPROVED,
  REJECTED,
  FAILED,
  CANCELLED,
}

export interface Donation {
  id: number;
  amount: string;
  createdAt: string;
  updatedAt: string;
  status: DonationStatus;
  paymentTransactionId: string;
  paymentCheckoutUrl: string;
  projectId?: number;
  institutionId?: number;
  donorId: number;
  institution?: IInstitution;
  project?: IProject;
  donor: IDonor & { account: { name: string; media: string } };
}
