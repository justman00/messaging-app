import React from 'react'
import { MessageInt } from './Messages'

const Message: React.FC<MessageInt> = props => {
  return (
    <div>
      <h4>{props.user.name}</h4>
      <p>{props.messageInput}</p>
    </div>
  )
}

export default Message
