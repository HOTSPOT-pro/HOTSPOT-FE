import type {
  DonutChartDataProps,
  DonutPercentFormatter,
} from '../components/chart/donut/DonutChart';

interface GetDonutDisplayContentParams {
  activeIndex: number | null;
  data: DonutChartDataProps[];
  formatPercent: DonutPercentFormatter;
  formatValue: (value: number) => string;
  total: number;
  totalLabel: string;
  totalUsed: number;
}

export interface DonutDisplayContent {
  label: string;
  percent: string;
  value: string;
}

export const getDonutDisplayContent = ({
  activeIndex,
  data,
  formatPercent,
  formatValue,
  total,
  totalLabel,
  totalUsed,
}: GetDonutDisplayContentParams): DonutDisplayContent => {
  if (activeIndex !== null && data[activeIndex]) {
    const activeData = data[activeIndex];
    return {
      label: activeData.name,
      percent: formatPercent(activeData.value, total, 'active'),
      value: formatValue(activeData.value),
    };
  }

  return {
    label: totalLabel,
    percent: formatPercent(totalUsed, total, 'total'),
    value: formatValue(totalUsed),
  };
};
