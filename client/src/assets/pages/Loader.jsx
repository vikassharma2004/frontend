import React from 'react'

const Loader = () => {
  return (

    <div class="flex flex-row gap-2 justify-center mt-20 align-center">
    <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
    <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
    <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
  </div>

  )
}

export default Loader