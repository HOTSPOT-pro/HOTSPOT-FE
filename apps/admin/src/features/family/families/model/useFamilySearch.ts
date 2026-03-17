'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getFamilyByPhoneClient } from '../api/getFamilyByPhoneClient';

const STALE_TIME = 600000; //10분

export const useFamilySearch = () => {
  const [searchPhone, setSearchPhone] = useState<string>('');

  const familyData = useQuery({
    enabled: searchPhone.length > 0,
    placeholderData: (previousData) => previousData,
    queryFn: () => getFamilyByPhoneClient(searchPhone),
    queryKey: ['phoneFamilyList', searchPhone],
    select: (data) => ({
      ...data,
      familyList: data.familyList.map((item) => ({
        ...item,
        id: `${item.familyId}`,
      })),
    }),
    staleTime: STALE_TIME,
  });

  const fetchByPhone = (phone: string) => {
    setSearchPhone(phone);
  };

  return {
    familyData: familyData.data,
    fetchByPhone,
    isFetching: familyData.isFetching,
    isLoading: familyData.isLoading,
    searchPhone,
  };
};
