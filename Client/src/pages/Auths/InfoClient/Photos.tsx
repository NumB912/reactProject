import React from 'react'
import CardComponent from './CardComponent'
import { useParams } from 'react-router'

const Photos = () => {
  const {id} = useParams()
  return (
   <CardComponent
  titleContent="Add your photos"
  content="Share your experience with this destination. Your opinion helps others!"
  urlContentLink="/PostPhotos"
  contentLink="Add photo"
/>
  )
}

export default Photos