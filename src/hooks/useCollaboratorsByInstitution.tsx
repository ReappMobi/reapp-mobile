import { useCallback, useEffect, useState } from 'react';
import { getCollaboratorByInstitutionId } from 'src/services/app-core';
import { ICollaborator } from 'src/types/ICollaborator';

import { useAuth } from './useAuth';

export const useCollaboratorsByInstitution = (institutionId: number) => {
  const auth = useAuth();
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await auth.getToken();
      setToken(token);
      const collaborators = await getCollaboratorByInstitutionId(
        institutionId,
        token
      );
      console.log(collaborators);
      setCollaborators(collaborators);
    } catch (error) {
      setError(error);
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
    collaborators,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
