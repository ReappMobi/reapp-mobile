import { useAuth } from 'src/hooks/useAuth';
import { likePost, unlikePost } from 'src/services/app-core';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useLike(postId: string | number, isLikedInitial: boolean) {
  const { token } = useAuth();

  const { isActive: isLiked, toggle: toggleLike } = useOptimisticToggle(
    isLikedInitial,
    {
      on: () => {
        if (token) {
          likePost({ id: +postId, token });
        }
      },
      off: () => {
        if (token) {
          unlikePost({ id: +postId, token });
        }
      },
    }
  );

  return { isLiked, toggleLike };
}
