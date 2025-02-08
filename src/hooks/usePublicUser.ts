import { useQuery } from '@tanstack/react-query';
import { getPublicUser } from '../backend/apiUser';
export default function usePublicUser() {
  const { isLoading, data } = useQuery({
    queryKey: ['publicUser'],
    queryFn: getPublicUser,
  });

  return { isLoading, data };
}
