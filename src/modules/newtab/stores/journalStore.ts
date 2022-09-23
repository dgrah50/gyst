import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { collection, getFirestore, onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import create from 'zustand';
import { generateBaseDays } from './JournalUtils';

export interface JournalEntry {
  rating: number | null;
  content: string;
}

export type JournalEntryMap = Map<string, JournalEntry>;

export interface JournalState {
  journalEntries: JournalEntryMap;
  updateSingleJournalEntry: (key: string, journalEntry: JournalEntry) => void;
  updateBulkJournalEntries: (journalEntries: JournalEntryMap) => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  journalEntries: new Map as JournalEntryMap,
  updateBulkJournalEntries: (journalEntries: JournalEntryMap) => {
    set((state) => {
      const newJournalEntries = new Map([...state.journalEntries, ...journalEntries]);

      return {
        ...state,
        journalEntries: newJournalEntries,
      };
    });
  },
  updateSingleJournalEntry: (key: string, journalEntry: JournalEntry) => {
    set((state) => {
      const newJournalEntries = new Map([...state.journalEntries])
      newJournalEntries.set(key, journalEntry)

      return {
        ...state,
        journalEntries: newJournalEntries,
      };
    });
  }
}))


export function useJournalSubscription(): null {
  const [uid, setUid] = useState<string | null>(null)
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setUid(user?.uid ?? null)
  });

  const db = getFirestore();
  const updateBulkJournalEntries = useJournalStore((state: JournalState) => state.updateBulkJournalEntries);
  updateBulkJournalEntries(generateBaseDays())
  useEffect(() => {
    const q = query(collection(db, `users/${uid}/journals`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const journals: JournalEntryMap = new Map;
      querySnapshot.docs.forEach(doc => {
        journals.set(doc.id.toString(), doc.data() as JournalEntry)
      })
      updateBulkJournalEntries(journals)
    })

    return () => unsubscribe()
  }, [db, uid, updateBulkJournalEntries])

  return null
}

