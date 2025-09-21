import { useCallback, useEffect, useState } from 'react';
import { getPartnerByInstitutionId } from 'src/services/app-core';
import type { IPartner } from 'src/types/IPartner';

import { useAuth } from './useAuth';

export const usePartnersByInstitution = (institutionId: number) => {
  const auth = useAuth();
  const [partners, setPartners] = useState<IPartner[]>([]);
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

      const partners = await getPartnerByInstitutionId(institutionId, token);
      setPartners(partners);
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
    partners,
    token,
    error,
    loading,
    refreshing,
    onRefresh,
  };
};
