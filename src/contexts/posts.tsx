import { createContext, useCallback, useEffect, useState } from 'react';
import { getPosts, getSharedCampaigns } from 'src/services/app-core';
import { IBanner, IPost } from 'src/types';

export type PostContextData = {
  posts: IPost[];
  banners: IBanner[];
  error: Error | null;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
};

export const PostContext = createContext<PostContextData>(
  {} as PostContextData
);

export type PostProviderProps = {
  token: string | null;
  children: React.ReactNode;
};

export const PostProvider: React.FC<PostProviderProps> = ({
  children,
  token,
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const banners = await getSharedCampaigns();
      setBanners(banners);

      const posts = await getPosts({ token });
      setPosts(posts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const refreshPosts = async () => {
    setRefreshing(true);
    try {
      await fetchPosts();
    } finally {
      setRefreshing(false);
    }
  };

  console.log('posts', posts);
  return (
    <PostContext.Provider
      value={{
        posts,
        banners,
        error,
        loading,
        refreshing,
        onRefresh: refreshPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
