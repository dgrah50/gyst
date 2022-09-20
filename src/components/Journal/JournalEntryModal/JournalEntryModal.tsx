import Button from '@components/Shared/Button';
import React from 'react';
import { Editor } from "react-split-mde"
import { parser } from 'react-split-mde/lib/parser';
import Modal from '@components/Shared/Modal';

import "react-split-mde/css/index.css"

export interface IJournalEntryModalProps {
    value: string;
    rating: number | null;
    isVisible: boolean;
    setModalContentValue: (newValue: string) => void;
    setModalRatingValue: (newValue: number) => void;
    onSubmit: () => void;
    onClose: () => void;
}



export default function JournalEntryModal(props: IJournalEntryModalProps): JSX.Element {
    const { value, rating, setModalContentValue, setModalRatingValue, isVisible, onSubmit, onClose } = props;

    // TODO: add confirmation dialog


    return (

        <Modal
            isVisible={isVisible}
            onSubmit={onSubmit}
            onClickBackdrop={onClose}
            headerText="journal test"
            className="flex flex-col w-11/12 max-w-5xl text-white bg-black border border-white h-11/12 h-1/2 backdrop-blur-xl"
            submitButtonText='save'
        >
            <Editor
                value={value}
                parser={parser}
                onChange={setModalContentValue}
                textareaClassName="text-white bg-black"
            />
            <div className='flex-col justify-center w-full p-2 text-center'>
                rate your day
                <div className="justify-center w-full btn-group">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <Button
                                className='text-white'
                                key={num}
                                onClick={() => setModalRatingValue(num)}
                                isActive={rating === num}>{num}</Button>
                        ))
                    }
                </div>
            </div>
        </Modal>
    );
}
