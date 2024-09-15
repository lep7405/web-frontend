import React from 'react'
import { useParams } from 'react-router-dom'
const SearchProduct = () => {
    const {id}=useParams();
    console.log(id)
  return (
    <div>SearchProduct</div>
  )
}

export default SearchProduct