import { useCallback, useEffect, useState } from 'react';
import { getSavedPosts } from 'src/services/app-core';
import type { IPost } from 'src/types';

import { useAuth } from './useAuth';

export const useSavedPosts = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await auth.getToken();
      setToken(token);

      const posts = await getSavedPosts({ token });
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
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
