import React, { Component } from 'react'
import { firestore } from '../../firebase'
import Message from './Message'
import MessageForm from './MessageForm'

interface User {
  uid: string
  name: string
}

export interface MessageInt {
  id: string
  messageInput: string
  user: User
}

interface State {
  messages: MessageInt[]
  currentUser: User
  heys: string[]
}

const localState: State = {
  messages: [],
  currentUser: {
    uid: '1',
    name: 'Vlad'
  },
  heys: []
}

class Messages extends Component<{}, State> {
  state = localState

  unsubscribeFromFirestore = (): void => {}

  changeUser = (bool: boolean) => {
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

  onAddMessage = (content: string) => {
    const msg = {
      messageInput: content,
      user: this.state.currentUser
    }

    firestore.collection('messages').add(msg)
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
      })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore()
  }

  render() {
    console.log(this.state.currentUser.name)
    return (
      <div>
        <h1>Your conversation</h1>
        <button onClick={() => this.changeUser(true)}>Write as Alex</button>
        <button onClick={() => this.changeUser(false)}>Write as Vlad</button>
        {this.state.messages.map(msg => (
          <Message {...msg} key={msg.id} />
        ))}
        <MessageForm onAddMessage={this.onAddMessage} />
      </div>
    )
  }
}

export default Messages
