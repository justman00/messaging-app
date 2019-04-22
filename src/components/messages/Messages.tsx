import React, { Component } from 'react'
import { firestore } from '../../firebase'
import Message from './Message'

interface User {
  uid: string
  name: string
}

interface MessageInt {
  id: string
  messageInput: string
  user: User
}

interface State {
  messages: MessageInt[]
  currentUser: User
}

class Messages extends Component<{}, State> {
  state = {
    messageInput: '',
    messages: [],
    currentUser: {
      uid: '1',
      name: 'Vlad'
    }
  }

  unsubscribeFromFirestore = (): void => {}

  public changeUser = (bool: boolean) => {
    let user: User

    if (bool) {
      user = {
        uid: '2',
        name: 'Alex'
      }
    } else {
      user = {
        uid: '1',
        name: 'Vlad'
      }
    }

    this.setState({ currentUser: user })
  }

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection('messages')
      .onSnapshot(snap => {
        const messages: MessageInt[] = snap.docs.map(doc => {
          const data = doc.data()

          const user: User = data.user
          const messageInput: string = data.messageInput

          return { id: doc.id, user, messageInput }
        })
        console.log(messages)
        this.setState({ messages })
        return
      })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore()
  }

  render() {
    return (
      <div>
        <h1>Your conversation</h1>
        {this.state.messages.map(msg => (
          <Message {...msg} key={msg.id} />
        ))}
      </div>
    )
  }
}

export default Messages
