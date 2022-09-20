import React, { useState } from 'react';
import PageContentWrapper from '@components/Shared/PageLayout/PageContentWrapper';
import PageHeader from '@components/Shared/PageLayout/PageHeader';
import PageWrapper from '@components/Shared/PageLayout/PageWrapper';
import Sidebar, { Days } from '@components/Journal/Sidebar/Sidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import './markdownBody.scss'
import Modal from '@components/Journal/Modal';

// TODO: Sync this to chrome storage
const mockDaysInit: Days = {
  "Mon 19 Sep": {
    rating: null, content: `
  # mon 19 sep
  This is a test
  
  ` },
  "Sun 18 Sep": { rating: 5, content: '' },
  "Sat 17 Sep": { rating: 9, content: '' },
  "Fri 16 Sep": { rating: 5, content: '' },
  "Thu 15 Sep": { rating: 7, content: '' },
  "Wed 14 Sep": { rating: 7, content: '' },
  "Tue 13 Sep": { rating: 2, content: '' },
  "Mon 12 Sep": { rating: 5, content: '' },
  "Sun 11 Sep": { rating: 2, content: '' },
  "Sat 10 Sep": { rating: 9, content: '' },
  "Fri 09 Sep": { rating: 7, content: '' },
  "Thu 08 Sep": { rating: 8, content: '' },
  "Wed 07 Sep": { rating: 3, content: '' },
  "Tue 06 Sep": { rating: 5, content: '' },
  "Mon 05 Sep": { rating: 8, content: '' },
  "Sun 04 Sep": { rating: 2, content: '' },
}

export default function Journal(): JSX.Element {

  const [days, setDays] = useState<Days>(mockDaysInit);
  const [selectedDay, setSelectedDay] = useState<keyof Days | null>(Object.keys(days)[0] ?? null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onCreateJournalEntry = (day: keyof Days) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }


  const modalValue = selectedDay ? days[selectedDay].content : ''
  const dayRating = selectedDay ? days[selectedDay].rating : null

  const setModalContentValue = (content: string) => {
    setDays({
      ...days,
      [selectedDay as string]: {
        ...days[selectedDay as string],
        content,
      }
    })
  }

  const setModalRatingValue = (rating: number) => {
    setDays({
      ...days,
      [selectedDay as string]: {
        ...days[selectedDay as string],
        rating,
      }
    })
  }

  return (
    <PageWrapper>
      <PageContentWrapper className='pt-0 pb-0 pl-0'>
        <div className="flex flex-row flex-1 min-h-0">
          <div className="flex h-full min-h-0 overflow-y-scroll border " style={{ width: "250px" }}>
            <Sidebar className="sidebar" days={days} selectedDay={selectedDay} onCreateJournalEntry={onCreateJournalEntry} />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-scroll border" >
            <PageHeader label="journal" />
            <div className="flex flex-col w-full p-2 text-white bg-red markdown-body">
              {selectedDay && <ReactMarkdown remarkPlugins={[remarkGfm]} >{days[selectedDay].content}</ReactMarkdown>}
            </div>
          </div>
        </div>
      </PageContentWrapper>
      {isModalOpen && <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} value={modalValue} setModalContentValue={setModalContentValue} setModalRatingValue={setModalRatingValue} onSubmit={() => setIsModalOpen(false)} rating={dayRating} />}
    </PageWrapper>
  );
}
