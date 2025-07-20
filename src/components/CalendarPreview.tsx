'use client';
import React, { useMemo } from 'react';
import { useRecurringStore } from '../store/useRecurringStore';

const CalendarPreview = () => {
  const {
    frequency,
    startDate,
    endDate,
    selectedWeekdays,
    selectedMonthDate,
    selectedYearMonth,
    selectedYearDay,
  } = useRecurringStore();

  const generateDates = () => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: string[] = [];

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return [];
    }

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      switch (frequency) {
        case 'daily':
          dates.push(new Date(d).toDateString());
          break;

        case 'weekly':
          if (selectedWeekdays.includes(d.getDay())) {
            dates.push(new Date(d).toDateString());
          }
          break;

        case 'monthly':
          if (d.getDate() === selectedMonthDate) {
            dates.push(new Date(d).toDateString());
          }
          break;

        case 'yearly':
          if (
            d.getDate() === selectedYearDay &&
            d.getMonth() === selectedYearMonth - 1 // ✅ Fix for 1-indexed month
          ) {
            dates.push(new Date(d).toDateString());
          }
          break;
      }
    }

    return dates;
  };

  const recurringDates = useMemo(() => generateDates(), [
    frequency,
    startDate,
    endDate,
    selectedWeekdays,
    selectedMonthDate,
    selectedYearMonth,
    selectedYearDay,
  ]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Calendar Preview:</h3>
      {recurringDates.length === 0 ? (
        <p className="text-gray-500">No recurring dates selected yet.</p>
      ) : (
        <div className="max-h-60 overflow-y-auto border p-4 rounded">
          <ul className="list-disc pl-5 space-y-1">
            {recurringDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarPreview;
