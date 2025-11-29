import { useAuth } from 'src/hooks/useAuth';
import { savePost, unsavePost } from 'src/services/app-core';
import { useOptimisticToggle } from './useOptimisticToggle';

export function useSave(postId: string | number, isSavedInitial: boolean) {
  const { token } = useAuth();

  const { isActive: isSaved, toggle: toggleSave } = useOptimisticToggle(
    isSavedInitial,
    {
      on: () => {
        if (token) savePost({ id: +postId, token });
      },
      off: () => {
        if (token) unsavePost({ id: +postId, token });
      },
    }
  );

  return { isSaved, toggleSave };
}
