import React, { Component } from 'react'
import { firestore } from '../../firebase'

interface Message {
  id: string
  messageInput: string
  user: User
}

interface User {
  uid: string
  name: string
}

interface State {
  messageInput: string
  messages: Message[]
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
        const messages = snap.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        console.log(messages)
        // this.setState({ messages })
      })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore()
  }

  render() {
    return (
      <div>
        <h1>Your conversation</h1>
      </div>
    )
  }
}

export default Messages
