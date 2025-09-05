import {
  Chart as ChartJS,
  type ChartData,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import type { ChartWithUserData } from '@/utils/chartUtils';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ComparisonRadarChartProps {
  currentUserChartData: ChartWithUserData;
  targetUserChartData: ChartWithUserData;
}

const currentUserColor = 'rgb(255, 159, 177)'; // 코랄 핑크
const currentUserColorTransparent = 'rgba(255, 159, 177, 0.3)'; // 반투명 코랄 핑크
const targetUserColor = 'rgb(144, 202, 249)'; // 스카이 블루
const targetUserColorTransparent = 'rgba(144, 202, 249, 0.3)'; // 반투명 스카이 블루
const hoverColor = '#fff'; // 호버 시 흰색

export const ComparisonRadarChart = ({ currentUserChartData, targetUserChartData }: ComparisonRadarChartProps) => {
  const data: ChartData<'radar'> = {
    labels: ['입맛', '가치관', '성향'],
    datasets: [
      {
        label: currentUserChartData.name,
        data: [currentUserChartData.taste, currentUserChartData.values, currentUserChartData.personality],
        borderColor: currentUserColor,
        backgroundColor: currentUserColorTransparent,
        borderWidth: 3,
        pointBackgroundColor: currentUserColor,
        pointBorderColor: currentUserColor,
        pointHoverBackgroundColor: hoverColor,
        pointHoverBorderColor: currentUserColor,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
      },
      {
        label: targetUserChartData.name,
        data: [targetUserChartData.taste, targetUserChartData.values, targetUserChartData.personality],
        borderColor: targetUserColor,
        backgroundColor: targetUserColorTransparent,
        borderWidth: 3,
        pointBackgroundColor: targetUserColor,
        pointBorderColor: targetUserColor,
        pointHoverBackgroundColor: hoverColor,
        pointHoverBorderColor: targetUserColor,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full relative h-[380px]">
      <Radar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
          },
          scales: {
            r: {
              angleLines: {
                color: currentUserColor,
              },
              grid: {
                color: currentUserColor,
              },
              pointLabels: {
                display: false,
              },
              ticks: {
                backdropColor: 'transparent',
                color: 'transparent',
                stepSize: 20,
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
