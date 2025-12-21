export type UpdateAccountData = {
  name?: string;
  email?: string;
  note?: string;
  category?: string;
  fields?: Record<string, string>;
  password?: string;
  passwordConfirmation?: string;
  media?: any;
};

export type EditInstitutionData = {
  name?: string;
  institutionId?: number;
  phone?: string;
  image?: string;
};

export type EditDonorData = {
  name?: string;
  donorId?: number;
  phone?: string;
  image?: string;
};
