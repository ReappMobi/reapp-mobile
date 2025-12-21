import { likePost, unlikePost } from 'src/services/posts/post.requests';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useLike(postId: string | number, isLikedInitial: boolean) {
  const { isActive: isLiked, toggle: toggleLike } = useOptimisticToggle(
    isLikedInitial,
    {
      on: () => {
        likePost(+postId);
      },
      off: () => {
        unlikePost(+postId);
      },
    }
  );

  return { isLiked, toggleLike };
}
