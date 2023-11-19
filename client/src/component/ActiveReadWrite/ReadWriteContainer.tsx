import React from 'react'
import Write from './Write'
import Read from './Read'


const ReadWriteContainer = () => {
  return (
    <div className='w-full p-6 flex gap-2 justify-evenly flex-wrap'>
      <Read></Read>
      <Write></Write>
    </div>
  )
}

export default ReadWriteContainer