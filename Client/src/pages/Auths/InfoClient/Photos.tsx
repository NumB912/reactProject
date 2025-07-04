import React from 'react'
import CardComponent from './CardComponent'

const Photos = () => {
  return (
   <CardComponent
  titleContent="Add your photos"
  content="Share your experience with this destination. Your opinion helps others!"
  urlContentLink="/profile/123/photos/new" // ← ví dụ
  contentLink="Add photo"
/>
  )
}

export default Photos