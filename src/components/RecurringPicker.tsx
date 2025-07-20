'use client';
import React from 'react';
import { useRecurringStore } from '../store/useRecurringStore';
import CalendarPreview from './CalendarPreview';

const RecurringPicker = () => {
  const {
    frequency,
    setFrequency,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    selectedWeekdays,
    toggleWeekday,
    selectedMonthDate,
    setMonthDate,
    selectedYearMonth,
    setYearMonth,
    selectedYearDay,
    setYearDay,
  } = useRecurringStore();

  return (
    <div className="border p-6 rounded-xl shadow-md w-full max-w-3xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Recurring Picker</h2>

      {/* Frequency Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {['daily', 'weekly', 'monthly', 'yearly'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 border rounded capitalize transition ${
              frequency === type ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            }`}
            onClick={() => setFrequency(type as any)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Start and End Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Frequency Specific Inputs */}
      <div className="space-y-6">
        {frequency === 'daily' && (
          <p className="text-center text-gray-600">You chose Daily recurrence.</p>
        )}

        {frequency === 'weekly' && (
          <div>
            <label className="block mb-1">Select weekdays:</label>
            <div className="flex flex-wrap gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${
                    selectedWeekdays.includes(index) ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => toggleWeekday(index)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {frequency === 'monthly' && (
          <div>
            <label className="block mb-1">Select date of the month:</label>
            <input
              type="number"
              min="1"
              max="31"
              value={selectedMonthDate ?? ''}
              onChange={(e) => setMonthDate(Number(e.target.value))}
              className="border rounded px-4 py-2 w-full"
              placeholder="e.g. 15"
            />
          </div>
        )}

        {frequency === 'yearly' && (
          <div>
            <label className="block mb-1">Select date of the year:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Month:</label>
                <select
                  value={selectedYearMonth}
                  onChange={(e) => setYearMonth(Number(e.target.value))}
                  className="border rounded px-4 py-2 w-full"
                >
                  {[
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December',
                  ].map((month, idx) => (
                    <option key={idx} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Day:</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={selectedYearDay}
                  onChange={(e) => setYearDay(Number(e.target.value))}
                  className="border rounded px-4 py-2 w-full"
                  placeholder="e.g. 25"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <CalendarPreview />
    </div>
  );
};

export default RecurringPicker;
