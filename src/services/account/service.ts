import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth';
import { INSTITUTIONS_PREFIX_KEY } from '../institutions/keys';
import { ACCOUNT_KEY } from './keys';
import * as requests from './requests';

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_KEY] });
    },
  });
};

export const useEditInstitutionInformation = () => {
  const { saveUserAndToken, token } = useContext(AuthContext);
  return useMutation({
    mutationFn: requests.editInstitutionInformation,
    onSuccess: (data) => {
      if (data && token) {
        saveUserAndToken(data, token);
      }
    },
  });
};

export const useEditDonorInformation = () => {
  const { saveUserAndToken, token } = useContext(AuthContext);
  return useMutation({
    mutationFn: requests.editDonorInformation,
    onSuccess: (data) => {
      if (data && token) {
        saveUserAndToken(data, token);
      }
    },
  });
};

export const useFollowAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.followAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INSTITUTIONS_PREFIX_KEY] });
    },
  });
};

export const useUnfollowAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.unfollowAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INSTITUTIONS_PREFIX_KEY] });
    },
  });
};
