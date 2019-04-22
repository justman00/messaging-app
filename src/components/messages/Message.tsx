import React from 'react'

interface Props {
  id: string
}

const Message: React.FC<Props> = props => {
  console.log(props)
  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default Message
