import { useInfiniteQuery } from '@tanstack/react-query';
import { DONATIONS_KEY } from './keys';
import * as requests from './requests';

export const useGetDonationsByDonor = (donorId: number, period: string) => {
  return useInfiniteQuery({
    queryKey: [DONATIONS_KEY, 'donor', donorId, period],
    queryFn: ({ pageParam }) =>
      requests.getDonationsByDonor({ donorId, period, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.donations.length === 10 ? allPages.length + 1 : undefined;
    },
    enabled: !!donorId,
  });
};

export const useGetInstitutionDonations = (period: string) => {
  return useInfiniteQuery({
    queryKey: [DONATIONS_KEY, 'institution', period],
    queryFn: ({ pageParam }) =>
      requests.getInstitutionDonations({ period, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.donations.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};

export const useGetGeneralDonations = (period: string) => {
  return useInfiniteQuery({
    queryKey: [DONATIONS_KEY, 'general', period],
    queryFn: ({ pageParam }) =>
      requests.getGeneralDonations({ period, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.donations.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};

export const useGetProjectDonations = (period: string) => {
  return useInfiniteQuery({
    queryKey: [DONATIONS_KEY, 'projects', period],
    queryFn: ({ pageParam }) =>
      requests.getProjectDonations({ period, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.donations.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};