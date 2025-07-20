import { create } from 'zustand';

type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurringState {
  frequency: FrequencyType;
  startDate: string;
  endDate: string;
  selectedWeekdays: number[];
  selectedMonthDate: number | null;
  selectedYearMonth: number;
  selectedYearDay: number;
  setFrequency: (f: FrequencyType) => void;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  toggleWeekday: (day: number) => void;
  setMonthDate: (d: number) => void;
  setYearMonth: (m: number) => void;
  setYearDay: (d: number) => void;
}

export const useRecurringStore = create<RecurringState>((set) => ({
  frequency: 'daily',
  startDate: '',
  endDate: '',
  selectedWeekdays: [],
  selectedMonthDate: null,
  selectedYearMonth: 1,
  selectedYearDay: 1,
  setFrequency: (f) => set({ frequency: f }),
  setStartDate: (d) => set({ startDate: d }),
  setEndDate: (d) => set({ endDate: d }),
  toggleWeekday: (day) =>
    set((state) => {
      const exists = state.selectedWeekdays.includes(day);
      return {
        selectedWeekdays: exists
          ? state.selectedWeekdays.filter((d) => d !== day)
          : [...state.selectedWeekdays, day],
      };
    }),
  setMonthDate: (d) => set({ selectedMonthDate: d }),
  setYearMonth: (m) => set({ selectedYearMonth: m }),
  setYearDay: (d) => set({ selectedYearDay: d }),
}));
