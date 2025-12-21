import { savePost, unsavePost } from 'src/services/posts/post.requests';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useSave(postId: string | number, isSavedInitial: boolean) {
  const { isActive: isSaved, toggle: toggleSave } = useOptimisticToggle(
    isSavedInitial,
    {
      on: () => {
        savePost(+postId);
      },
      off: () => {
        unsavePost(+postId);
      },
    }
  );

  return { isSaved, toggleSave };
}