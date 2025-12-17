import { useState, useEffect } from 'react';

// Interfaces for data types
export interface StaffMetric {
  name: string;
  count: number;
  fill: string; // Color for the chart bar
}

interface CallMetrics {
  today: StaffMetric[];
  lastWeek: StaffMetric[];
}

// Mock Data
const MOCK_DATA_TODAY: StaffMetric[] = [
  { name: 'Sarah J.', count: 42, fill: '#8884d8' },
  { name: 'Mike T.', count: 35, fill: '#82ca9d' },
  { name: 'Jessica L.', count: 28, fill: '#ffc658' },
  { name: 'David B.', count: 22, fill: '#ff8042' },
  { name: 'Emily R.', count: 19, fill: '#0088FE' },
];

const MOCK_DATA_LAST_WEEK: StaffMetric[] = [
  { name: 'Sarah J.', count: 180, fill: '#8884d8' },
  { name: 'Mike T.', count: 165, fill: '#82ca9d' },
  { name: 'Jessica L.', count: 150, fill: '#ffc658' },
  { name: 'David B.', count: 142, fill: '#ff8042' },
  { name: 'Emily R.', count: 138, fill: '#0088FE' },
];

/**
 * Hook to fetch call metrics.
 * Currently returns mock data, but will later fetch from Node/Express API.
 */
export const useMockCallMetrics = () => {
  const [data, setData] = useState<CallMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData({
        today: MOCK_DATA_TODAY,
        lastWeek: MOCK_DATA_LAST_WEEK,
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
};