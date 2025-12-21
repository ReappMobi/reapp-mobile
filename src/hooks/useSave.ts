import { useSavePost, useUnsavePost } from 'src/services/posts/post.service';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useSave(postId: string | number, isSavedInitial: boolean) {
  const { mutate: save } = useSavePost();
  const { mutate: unsave } = useUnsavePost();

  const { isActive: isSaved, toggle: toggleSave } = useOptimisticToggle(
    isSavedInitial,
    {
      on: () => {
        save(+postId);
      },
      off: () => {
        unsave(+postId);
      },
    }
  );

  return { isSaved, toggleSave };
}