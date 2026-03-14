import type { ReportData } from '../model/types';
import { mockReportData } from './mockup';

export const getAnalyzeData = {
  getWeeklyReport: async (_subId: number): Promise<ReportData> => {
    // TODO: 실제 API 연동 시 아래 코드로 교체
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${_subId}`, {
    //   cache: 'no-store',
    // });
    // if (!res.ok) throw new Error(`Failed to fetch report: ${res.status}`);
    // const json: ReportResponse = await res.json();
    // return json.data;

    return mockReportData;
  },
};
