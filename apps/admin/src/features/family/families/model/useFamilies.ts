import { useFamilyList } from '@/domains/family';
import { useFamilySearch } from './useFamilySearch';

export const useFamilies = (page: number, size: number) => {
  const search = useFamilySearch();
  const list = useFamilyList({ page, size });

  const isSearching = Boolean(search.searchPhone && search.searchPhone.length > 0);

  // 데이터와 상태를 내부에서 통합
  const data = isSearching ? search.familyData : list.familyData;
  const isLoading = isSearching
    ? search.isLoading || search.isFetching
    : list.isLoading || list.isFetching;

  return {
    data: data?.familyList ?? [],
    fetchByPhone: search.fetchByPhone,
    isLoading,
    isSearching,
    totalCount: data?.totalElements ?? 0,
  };
};
