import type { IDonor } from 'src/mocks/user-data';

import type { IInstitution } from './IInstitution';
import type { IMedia } from './IMedia';
import type { IProject } from './IProject';

enum DonationStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  FAILED = 3,
  CANCELLED = 4,
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
  donor: IDonor & { account: { name: string; media: IMedia } };
}
