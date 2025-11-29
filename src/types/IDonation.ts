
import { IInstitution } from './IInstitution';
import { IMedia } from './IMedia';
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
  donor: Record<string, any> & { account: { name: string; media: IMedia } };
}
