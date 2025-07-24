import React from 'react'
import { Link, useParams } from 'react-router'
import CardComponent from './CardComponent'

const Reviews = () => {
  return (
    <CardComponent titleContent='Write your new Reviews' content=' Share your experience with this destination. Your opinion helps others!' urlContentLink="/WriteReview" contentLink='Write a new review' />
  )
}

export default Reviews