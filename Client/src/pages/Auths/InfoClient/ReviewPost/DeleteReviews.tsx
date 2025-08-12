import React from 'react'
import Prompt from '../../../../component/Prompt'
interface DeleteReviewsProp {
  isOpen: boolean;
  setIsOpen: () => void;
}
const DeleteReviews = ({ isOpen, setIsOpen }: DeleteReviewsProp) => {

  return (
    <Prompt
        isOpen={isOpen}
        onClose={setIsOpen}
        content="Are you sure you want to delete this review?"
        title="Delete review"
        onCancel={() => {}}
        onHandle={() => {}}
      />

  )
}

export default DeleteReviews