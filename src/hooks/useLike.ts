import { useLikePost, useUnlikePost } from 'src/services/posts/post.service';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useLike(postId: string | number, isLikedInitial: boolean) {
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const { isActive: isLiked, toggle: toggleLike } = useOptimisticToggle(
    isLikedInitial,
    {
      on: () => {
        like(+postId);
      },
      off: () => {
        unlike(+postId);
      },
    }
  );

  return { isLiked, toggleLike };
}