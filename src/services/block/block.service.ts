import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { blockUser, unblockUser } from './block.requests';
import type { BlockUserData, UnblockUserData } from './block.types';

export function useBlockUser(
  options?: UseMutationOptions<unknown, Error, BlockUserData>
) {
  return useMutation({
    mutationFn: ({ userId }: BlockUserData) => blockUser(userId),
    ...options,
  });
}

export function useUnblockUser(
  options?: UseMutationOptions<unknown, Error, UnblockUserData>
) {
  return useMutation({
    mutationFn: ({ userId }: UnblockUserData) => unblockUser(userId),
    ...options,
  });
}
