import { useCallback, useEffect, useState } from 'react';
import { getInstituitionPosts } from 'src/services/app-core';
import type { IPost } from 'src/types';

import { useAuth } from './useAuth';

export const usePostsByInstitution = (institutionId: number) => {
  const auth = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await auth.getToken();
      setToken(token);

      const posts = await getInstituitionPosts(institutionId, token);
      setPosts(posts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  return {
    posts,
    setPosts,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
