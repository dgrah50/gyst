import React, { useCallback, useState } from 'react';
import PageContentWrapper from '@components/PageLayout/PageContentWrapper';
import PageHeader from '@components/PageLayout/PageHeader';
import PageWrapper from '@components/PageLayout/PageWrapper';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import './markdownBody.scss'
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { useJournalStore } from '@stores/journalStore';
import JournalEntryModal from './components/JournalEntryModal';
import Sidebar from './components/JournalSidebar';

export default function Journal(): JSX.Element {
  const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  const db = getFirestore();

  const journalEntries = useJournalStore((state) => state.journalEntries);


  const [selectedDay, setSelectedDay] = useState<string | null>(journalEntries.keys().next().value ?? null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onCreateJournalEntry = (day: string) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }

  const modalValue = (selectedDay ? journalEntries.get(selectedDay)?.content : '') ?? ''
  const dayRating = (selectedDay ? journalEntries.get(selectedDay)?.rating : null) ?? null



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
            className="flex h-full min-h-0 overflow-y-scroll border-r "
            style={{ width: "250px" }}>
            <Sidebar
              className="sidebar"
              journalEntries={journalEntries}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
              onCreateJournalEntry={onCreateJournalEntry} />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-scroll ">
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
