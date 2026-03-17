import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { AIReportData } from '../model/types';

interface getAnalyzeDataProps {
  subId: number;
  reportId: number;
}

export const getAnalyzeData = async ({ subId, reportId }: getAnalyzeDataProps) => {
  const { data } = await api.get<ApiResponse<AIReportData>>(
    `/api/v1/ai-reports/families/members/${subId}/reports/${reportId}`,
  );
  return data.data;
};
