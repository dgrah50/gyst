
import { JournalEntry, JournalEntryMap } from "./journalStore";
import { questions } from "../pages/Journal/questions";

const dayOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/**
 * It generates a map of 14 journal entries for the last 14 days
 * Each journal entry has a random question for reflection
 * @returns A map of journal entries.
 */
export const generateBaseDays = (): JournalEntryMap => {
  const journalEntries: JournalEntryMap = new Map;
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateID = convertDateToDateId(date);
    journalEntries.set(dateID, generateJournalTemplate(date));
  }

  return journalEntries;
}

// TODO: Write test for the following functions

/**
 * It takes a date and returns a string in the format DDMMYYYY
 * @param {Date} date - The date to convert to a dateId
 * @returns A string in the format of DDMMYYYY
 */
const convertDateToDateId = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, '0')}${date.getMonth().toString().padStart(2, '0')}${date.getFullYear()}`
}

/**
 * It takes a string in the format DDMMYYYY and returns a date object
 * @param A string in the format of DDMMYYYY
 * @returns {Date} date - The date to convert to a dateId
 */
const convertDateIdToDate = (dateId: string): Date => {
  const day = parseInt(dateId.slice(0, 2), 10);
  const month = parseInt(dateId.slice(2, 4), 10);
  const year = parseInt(dateId.slice(4, 8), 10);

  return new Date(year, month, day);
}

/**
 * It takes a dateId, converts it to a date, and then returns a human readable date
 * in the format of Day DD Month
 * @param {string} dateId - The dateId of the date you want to convert.
 * @returns A string
 */
export const generateHumanDateFromDateId = (dateId: string): string => {
  const date = convertDateIdToDate(dateId);

  return `${dayOfWeek[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}


/**
 * It takes a date as an argument and returns a journal entry in Markdown format with a random question from the questions
 * array
 * @param {Date} date - Date - the date of the journal entry
 * @returns A function that takes a date and returns a journal entry
 */
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

