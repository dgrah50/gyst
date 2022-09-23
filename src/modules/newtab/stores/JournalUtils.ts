
import { JournalEntry, JournalEntryMap } from "./journalStore";
import { questions } from "../pages/Journal/questions";


export const generateBaseDays = (): JournalEntryMap => {
  const journalEntries: JournalEntryMap = new Map;
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateID = generateDateId(date);
    journalEntries.set(dateID, generateJournalTemplate(date));
  }

  return journalEntries;
}

const generateDateId = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, '0')}${date.getMonth().toString().padStart(2, '0')}${date.getFullYear()}`
}


const dayOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']


const convertDateIdToDate = (dateId: string): Date => {
  const day = parseInt(dateId.slice(0, 2), 10);
  const month = parseInt(dateId.slice(2, 4), 10);
  const year = parseInt(dateId.slice(4, 8), 10);

  return new Date(year, month, day);
}

export const generateHumanDateFromDateId = (dateId: string): string => {
  const date = convertDateIdToDate(dateId);

  return `${dayOfWeek[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}


const generateJournalTemplate = (date: Date): JournalEntry => {
  const question = questions[Math.floor(Math.random() * questions.length)];

  return {
    rating: null,
    content: ` # ${dayOfWeek[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}
  ### how do you feel today? 

  ### ${question.toLowerCase()}

  `
  }
}

