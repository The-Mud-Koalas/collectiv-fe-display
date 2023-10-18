import React from 'react'

interface Props {
    message?: string;
}

const FieldErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <p role="alert" className="text-sm text-red-600">{ message }</p>
  )
}

export default FieldErrorMessage