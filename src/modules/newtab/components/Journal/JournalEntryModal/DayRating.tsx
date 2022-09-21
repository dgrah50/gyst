import Button from "@components/Shared/Button";
import React from "react";

export interface DayRatingProps {
    setModalRatingValue: (newValue: number) => void;
    rating: number | null;
}

export function DayRating(props: DayRatingProps): JSX.Element  {
    const { setModalRatingValue, rating} = props;
    
return (
        <div className="justify-center w-full btn-group">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => <Button
className="text-white"
key={num}
onClick={() => setModalRatingValue(num)}
isActive={rating === num}>
              {num}
                                                  </Button>)}
        </div>);
}