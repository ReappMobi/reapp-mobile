import { useCallback, useEffect, useState } from 'react';
import { getProjectByInstitutionId } from 'src/services/app-core';
import type { IProject } from 'src/types';

import { useAuth } from './useAuth';

export const useProjectsByInstitution = (institutionId: number) => {
  const auth = useAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
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

      const projects = await getProjectByInstitutionId(institutionId, token);
      setProjects(projects);
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
    projects,
    setProjects,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
