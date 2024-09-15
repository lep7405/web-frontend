import React from 'react'
import Rate from './Rate'
import CreateComment from './CreateComment'

const Review = ({rating,setRating,comment,setComment}) => {
  return (
    <div>Review
        <Rate rating={rating} setRating={setRating}/>
        <CreateComment comment={comment} setComment={setComment}/>
    </div>
  )
}

export default Review