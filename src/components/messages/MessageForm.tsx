import React, { useState } from 'react'

interface Props {
  onAddMessage: (content: string) => void
}

const MessageForm: React.FC<Props> = props => {
  const [content, setContent] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value)
  }

  const handleSubmit = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    e.preventDefault()

    props.onAddMessage(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={content} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default MessageForm
