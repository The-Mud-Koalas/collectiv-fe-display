import React from 'react'



const RoundedCircle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={`w-5 h-5 sm:w-8 sm:h-8 flex justify-center items-center rounded-[50%] border-[3px] border-primary-800`}>{ children }</div>
  )
}

export default RoundedCircle