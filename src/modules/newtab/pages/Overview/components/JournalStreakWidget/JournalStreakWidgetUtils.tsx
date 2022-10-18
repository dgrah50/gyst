export interface HeatMapPoint { date: Date, count: number | null }

export interface StreakGridProps {
  heatmapData: HeatMapPoint[]
}

export const calculateJournalStreak = (journalEntries: HeatMapPoint[]): number => {
  let streak = 0;

  if (journalEntries.length === 0) {
    return streak;
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    !isSameDay(journalEntries[0].date, today) &&
    !isSameDay(journalEntries[0].date, yesterday)
  ) {
    return 0
  }

  // Increment streak for today
  streak++
  for (let i = 0; i < journalEntries.length - 1; i++) {
    const currentEntryDate = journalEntries[i].date;
    const nextEntryDate = journalEntries[i + 1].date;
    if (isSameDay(shiftDateByOne(currentEntryDate), nextEntryDate)) {
      streak++;
    } else {
      break;
    }
  }

  return streak
}

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

const shiftDateByOne = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);

  return newDate;
}