import { useCallback, useEffect, useState } from 'react';
import { getPosts, getSharedCampaigns } from 'src/services/app-core';
import { IBanner, IPost } from 'src/types';

import { useAuth } from './useAuth';

export const usePostsAndBanners = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [banners, setBanners] = useState<IBanner[]>([]);

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

      const banners = await getSharedCampaigns();
      setBanners(banners);

      const posts = await getPosts({ token });
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
    banners,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
