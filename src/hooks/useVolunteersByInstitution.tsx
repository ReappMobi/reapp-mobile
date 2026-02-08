import { useCallback, useEffect, useState } from 'react';
import { getVolunteersByInstitutionId } from 'src/services/app-core';
import { IPartner } from 'src/types/IPartner';

import { useAuth } from './useAuth';

export const useVolunteersByInstitution = (institutionId: number) => {
  const auth = useAuth();
  const [volunteers, setVolunteers] = useState<IPartner[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!auth.token) return;

      const volunteers = await getVolunteersByInstitutionId(
        institutionId,
        auth.token
      );
      setVolunteers(volunteers);
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
    volunteers,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
