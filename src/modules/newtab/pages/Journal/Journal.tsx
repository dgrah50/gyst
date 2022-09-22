import React, { useCallback, useEffect, useState } from 'react';
import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';
import Sidebar, { JournalEntry, JournalEntryMap } from '@components/Journal/Sidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import './markdownBody.scss'
import JournalEntryModal from '@components/Journal/JournalEntryModal';
import { getFirestore, collection, doc, setDoc, onSnapshot, query } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { generateBaseDays } from './JournalUtils';

export default function Journal(): JSX.Element {
  const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  const db = getFirestore();



  const [journalEntries, setJournalEntries] = useState<JournalEntryMap>(generateBaseDays());
  const [selectedDay, setSelectedDay] = useState<string | null>(journalEntries.keys().next().value ?? null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onCreateJournalEntry = (day: string) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }

  const modalValue = (selectedDay ? journalEntries.get(selectedDay)?.content : '') ?? ''
  const dayRating = (selectedDay ? journalEntries.get(selectedDay)?.rating : null) ?? null

  useEffect(() => {
    const q = query(collection(db, `users/${uid}/journals`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const journals: JournalEntryMap = new Map;
      querySnapshot.docs.forEach(doc => {
        journals.set(doc.id.toString(), doc.data() as JournalEntry)
        console.log('docdata', doc.data())
      })
      setJournalEntries((journalEntries) => new Map([...journalEntries, ...journals]))
    })

    return () => unsubscribe()
  }, [db, uid])


  const setModalContentValue = useCallback(async (content: string) => {
    if (!selectedDay) return
    if (!uid) return
    try {
      await setDoc(doc(db, "users", uid, "journals", selectedDay), {
        content,
      }, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [db, selectedDay, uid])

  const setModalRatingValue = useCallback(async (rating: number) => {
    if (!selectedDay) return
    if (!uid) return
    try {
      await setDoc(doc(db, "users", uid, "journals", selectedDay), {
        rating,
      }, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [selectedDay, uid, db])

  return (
    <PageWrapper>
      <PageContentWrapper className='pt-0 pb-0 pl-0'>
        <div className="flex flex-row flex-1 min-h-0">
          <div
            className="flex h-full min-h-0 overflow-y-scroll border "
            style={{ width: "250px" }}>
            <Sidebar
              className="sidebar"
              journalEntries={journalEntries}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
              onCreateJournalEntry={onCreateJournalEntry} />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-scroll border">
            <PageHeader label="journal" />
            <div className="flex flex-col w-full p-2 text-white markdown-body">
              {selectedDay && <ReactMarkdown remarkPlugins={[remarkGfm]}>{journalEntries.get(selectedDay)?.content ?? ''}</ReactMarkdown>}
            </div>
          </div>
        </div>
      </PageContentWrapper>
      {isModalOpen &&
        <JournalEntryModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          value={modalValue}
          setModalContentValue={setModalContentValue}
          setModalRatingValue={setModalRatingValue}
          onSubmit={() => setIsModalOpen(false)}
          rating={dayRating} />}
    </PageWrapper>
  );
}
